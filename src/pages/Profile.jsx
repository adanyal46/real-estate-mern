import {
	Avatar,
	Button,
	Card,
	Flex,
	Form,
	Image,
	Input,
	Progress,
	Space,
	Typography,
	Upload,
} from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
let fileUrl = null
function Profile() {
	const [fileList, setFileList] = useState([])
	const [downloadUrl, setDownloadUrl] = useState([])
	const { currentUser } = useSelector(state => state.user)

	let initialValues = {
		username: currentUser.username,
		email: currentUser.email,
	}
	const handleChange = ({ fileList }) => setFileList(fileList)
	const avatarSrc =
		fileList.length > 0
			? URL.createObjectURL(fileList.at(-1).originFileObj)
			: currentUser.avatar

	const handleSubmit = async values => {
		console.log(values)
		const formData = new FormData()
		Object.keys(values).forEach(key => {
			formData.append(key, values[key])
		})

		if (fileList.length > 0) {
			await handleFileUpload(fileList.at(-1).originFileObj)
			formData.append('avatar', downloadUrl)
		}
	}

	const handleFileUpload = file => {
		const storage = getStorage(app)
		const fileName = new Date().getTime() + file.name
		const storageRef = ref(storage, fileName)
		const uploadTask = uploadBytesResumable(storageRef, file)
		uploadTask.on(
			'state_changed',
			snapshot => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			},
			error => {
				console.log(error)
			},
			() =>
				getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
					setDownloadUrl(downloadUrl)
				})
		)
	}

	console.log(downloadUrl)
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
						<Avatar
							style={{ border: '1px solid #ccc' }}
							src={
								<Image
									preview={false}
									src={avatarSrc}
									alt="avatar"
									style={{
										width: 100,
										height: 100,
									}}
								/>
							}
							size={100}
						/>
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
					<Space direction="vertical" className="w-100">
						<Button type="primary" htmlType="submit" block>
							Update Profile
						</Button>
						<Button style={{ background: 'green' }} type="primary" block>
							Create Listing
						</Button>
					</Space>
				</Form>
			</Card>
			<Flex justify="space-between" style={{ marginTop: '15px' }}>
				<Typography.Link type="danger">Delete Account</Typography.Link>
				<Typography.Link type="danger">Sign Out</Typography.Link>
			</Flex>
		</div>
	)
}

export default Profile
