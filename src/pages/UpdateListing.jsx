import React, { useEffect, useState } from 'react'
import {
	Row,
	Col,
	Form,
	Input,
	Typography,
	Flex,
	Checkbox,
	InputNumber,
	Space,
	Button,
	Radio,
	message,
} from 'antd'
import MyUploadComponent from '../components/MyUploadComponent'
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function UpdateListing() {
	let [form] = Form.useForm()
	const params = useParams()
	const { currentUser } = useSelector(state => state.user)
	const [fileList, setFileList] = useState([])
	const [loading, setLoading] = useState(false)
	const [imageUrls, setImageUrls] = useState([])
	const [formData, setFormData] = useState({
		imageUrls: [],
	})
	useEffect(() => {
		fetchUserListing()
		return () => {}
	}, [])
	const fetchUserListing = async () => {
		const listing = await axios.get(`/api/listing/get/${params.id}`)
		form.setFieldsValue(listing.data)
		setFormData({ imageUrls: listing.data.imageUrls })
		let imageData = listing?.data?.imageUrls.map((item, index) => ({
			id: index,
			url: item,
		}))
		setFileList(imageData)
	}

	const handleFileUpload = async () => {
		let files = []
		if (fileList.length > 0) {
			try {
				for (let i = 0; i < fileList.length; i++) {
					const url = await storeImages(fileList[i].originFileObj)
					files.push(url)
				}

				setFormData(prevFormData => ({
					...prevFormData,
					imageUrls: prevFormData.imageUrls.concat(files),
				}))
			} catch (error) {
				console.error('Error uploading files:', error)
			}
		}
	}
	const storeImages = file => {
		return new Promise(async (resolve, reject) => {
			try {
				const storage = getStorage(app)
				const fileName = new Date().getTime() + file.name
				const storageRef = ref(storage, fileName)
				const uploadTask = uploadBytesResumable(storageRef, file)

				uploadTask.on(
					'state_changed',
					snapshot => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						console.log('Upload Progress', progress)
					},
					error => {
						reject(error)
					},
					async () => {
						const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
						message.success('Upload Successfull')
						resolve(downloadUrl)
					}
				)
			} catch (error) {
				reject(error)
			}
		})
	}

	const handleSubmit = async values => {
		setLoading(true)
		if (fileList.length < 1) {
			message.error('Please upload at least one image upload')
			setLoading(false)
			return
		}
		if (values['discountPrice'] > values['regularPrice']) {
			message.error('Discount price must be less than regular price')
			setLoading(false)
			return
		}

		// Set default values if they are undefined
		values.furnished = values.furnished !== undefined ? values.furnished : false
		values.offer = values.offer !== undefined ? values.offer : false
		values.parking = values.parking !== undefined ? values.parking : false
		values['userRef'] = currentUser._id
		values['imageUrls'] = formData.imageUrls

		try {
			const response = await axios.post('/api/listing/create', values)
			setLoading(false)
			form.resetFields()
			setFileList([])
			setFormData({ imageUrls: [] })
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
		setLoading(false)
	}
	// console.log(handleFileUpload())
	return (
		<Form
			form={form}
			size="large"
			style={{ marginBlock: '40px' }}
			onFinish={handleSubmit}
		>
			<div className="container">
				<Flex justify="center" style={{ paddingBottom: '20px' }}>
					<Typography.Title level={2}>Update a listing</Typography.Title>
				</Flex>
				<Row gutter={[24, 24]}>
					<Col xs={24} md={15}>
						<Form.Item
							name={'name'}
							rules={[{ required: true, message: 'Please enter name!' }]}
						>
							<Input placeholder="Enter name of listing" />
						</Form.Item>
						<Form.Item
							name={'description'}
							rules={[{ required: true, message: 'Please enter description!' }]}
						>
							<Input.TextArea placeholder="Enter description of listing" />
						</Form.Item>
						<Form.Item
							name={'address'}
							rules={[{ required: true, message: 'Please enter address!' }]}
						>
							<Input placeholder="Enter address of listing" />
						</Form.Item>
						<Flex wrap="wrap" gap={'large'}>
							<Form.Item name={'type'}>
								<Radio.Group name="type">
									<Radio value={'sale'}>Sale</Radio>
									<Radio value={'rent'}>Rent</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item name={'parking'} valuePropName="checked">
								<Checkbox name="parking">Parking Spot</Checkbox>
							</Form.Item>
							<Form.Item name={'furnished'} valuePropName="checked">
								<Checkbox name="furnished">Furnished</Checkbox>
							</Form.Item>
							<Form.Item name={'offer'} valuePropName="checked">
								<Checkbox name="offer">Offer</Checkbox>
							</Form.Item>
						</Flex>

						<Space className="w-100" wrap>
							<Form.Item
								name={'bedrooms'}
								rules={[{ required: true, message: 'Please enter bedrooms!' }]}
							>
								<InputNumber className="w-100" placeholder="bedrooms" />
							</Form.Item>

							<Form.Item
								name={'bathrooms'}
								rules={[{ required: true, message: 'Please enter bathrooms!' }]}
							>
								<InputNumber className="w-100" placeholder="bathrooms" />
							</Form.Item>
						</Space>
						<Form.Item
							name={'regularPrice'}
							rules={[
								{ required: true, message: 'Please enter regular price!' },
							]}
						>
							<InputNumber
								className="w-100"
								placeholder="Price"
								addonAfter="month"
							/>
						</Form.Item>
						<Form.Item
							name={'discountPrice'}
							rules={[
								{ required: true, message: 'Please enter discounted price!' },
							]}
						>
							<InputNumber
								className="w-100"
								placeholder="Discount Price"
								addonAfter="month"
							/>
						</Form.Item>
					</Col>
					<Col xs={24} md={9}>
						<Form.Item name={'imageUrls'}>
							<MyUploadComponent
								fileList={fileList}
								setFileList={setFileList}
								handleUpload={handleFileUpload}
								imageUrls={imageUrls}
								setImageUrls={imageUrls}
							/>
						</Form.Item>
						<Button loading={loading} type="primary" htmlType="submit" block>
							Create Listing
						</Button>
					</Col>
				</Row>
			</div>
		</Form>
	)
}

export default UpdateListing
