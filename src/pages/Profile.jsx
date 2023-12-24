import {
	Avatar,
	Button,
	Card,
	Flex,
	Form,
	Image,
	Input,
	Popconfirm,
	Progress,
	Space,
	Typography,
	Upload,
	message,
} from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import {
	deleteUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	updateUserFailure,
	updateUserStart,
	updateUserSuccess,
} from '../redux/user/userSlice'
let fileUrl = null
function Profile() {
	const { currentUser, loading, error } = useSelector(state => state.user)
	const [fileList, setFileList] = useState([])
	const dispatch = useDispatch()

	const initialValues = {
		username: currentUser.username,
		email: currentUser.email,
	}

	const handleChange = ({ fileList }) => setFileList(fileList)
	const avatarSrc =
		fileList.length > 0
			? URL.createObjectURL(fileList.at(-1).originFileObj)
			: currentUser.avatar
	const uploadFile = async file => {
		const storage = getStorage(app)
		const fileName = `${new Date().getTime()}${file.name}`
		const storageRef = ref(storage, fileName)
		const uploadTask = uploadBytesResumable(storageRef, file)

		return new Promise((resolve, reject) => {
			uploadTask.on(
				'state_changed',
				snapshot => {
					// Handle progress, e.g., updating a progress bar
				},
				error => reject(error),
				async () => {
					const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
					resolve(downloadUrl)
				}
			)
		})
	}
	const handleSubmit = async values => {
		dispatch(updateUserStart())
		try {
			if (fileList.length > 0) {
				const file = fileList[0].originFileObj
				const downloadUrl = await uploadFile(file)
				values['avatar'] = downloadUrl
			}

			const response = await axios.post(
				`/api/user/update/${currentUser._id}`,
				values
			)
			dispatch(updateUserSuccess(response.data))
		} catch (error) {
			const message = error.response?.data?.message || error.message
			dispatch(updateUserFailure(message))
		}
	}

	const handleDeleteAccount = async () => {
		console.log('click')
		dispatch(deleteUserStart())
		try {
			let response = await axios.delete(
				`/api/user/delete/${currentUser._id}`,
				{}
			)
			dispatch(deleteUserSuccess())
			message.success(response.data)
		} catch (error) {
			const message = error.response?.data?.message || error.message
			dispatch(deleteUserFailure(message))
		}
	}
	return (
		<div style={{ maxWidth: '500px', marginInline: 'auto', marginTop: '20px' }}>
			<Card
				title={
					<Typography.Title level={3} className="my-0">
						Profile Setting
					</Typography.Title>
				}
			>
				<Flex justify="center" style={{ marginBottom: '20px' }}>
					<Upload
						onChange={handleChange}
						fileList={fileList}
						showUploadList={false}
						listType="picture"
						beforeUpload={() => false} // Prevent automatic upload
					>
						<Avatar src={avatarSrc} size={100} />
					</Upload>
				</Flex>

				<Form
					initialValues={initialValues}
					size="large"
					layout="vertical"
					onFinish={handleSubmit}
				>
					<Form.Item name={'username'} rules={[{ required: true }]}>
						<Input placeholder="Enter your name" />
					</Form.Item>
					<Form.Item name={'email'} rules={[{ type: 'email', required: true }]}>
						<Input placeholder="Enter your email" />
					</Form.Item>
					<Form.Item name={'password'} rules={[{ required: false }]}>
						<Input.Password placeholder="Enter your password" />
					</Form.Item>
					<Space direction="vertical" className="w-100">
						<Button loading={loading} type="primary" htmlType="submit" block>
							Update Profile
						</Button>
						<Button style={{ background: 'green' }} type="primary" block>
							Create Listing
						</Button>
					</Space>
				</Form>
			</Card>
			<Flex justify="space-between" style={{ marginTop: '15px' }}>
				<Popconfirm
					title="Are you sure you want to delete your account?"
					onConfirm={handleDeleteAccount}
					okText="Yes"
					cancelText="No"
				>
					<Button style={{ color: '#ff4d4f' }} type="link">
						Delete Account
					</Button>
				</Popconfirm>

				<Typography.Link type="danger">Sign Out</Typography.Link>
			</Flex>
		</div>
	)
}

export default Profile
