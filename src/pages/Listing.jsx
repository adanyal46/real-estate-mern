import React from 'react'
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
} from 'antd'
import MyUploadComponent from '../components/MyUploadComponent'
function Listing() {
	return (
		<Form size="large" style={{ marginBlock: '40px' }}>
			<div className="container">
				<Flex justify="center" style={{ paddingBottom: '20px' }}>
					<Typography.Title level={2}>Create a listing</Typography.Title>
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
								<Checkbox>Sell</Checkbox>
							</Form.Item>
							<Form.Item name={'type'}>
								<Checkbox>Rent</Checkbox>
							</Form.Item>
							<Form.Item name={'parking'}>
								<Checkbox>Parking Spot</Checkbox>
							</Form.Item>
							<Form.Item name={'furnished'}>
								<Checkbox>Furnished</Checkbox>
							</Form.Item>
							<Form.Item name={'offer'}>
								<Checkbox>Offer</Checkbox>
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
								name={'baths'}
								rules={[{ required: true, message: 'Please enter baths!' }]}
							>
								<InputNumber className="w-100" placeholder="baths" />
							</Form.Item>
							<Form.Item
								name={'regularPrice'}
								rules={[
									{ required: true, message: 'Please enter regular price!' },
								]}
							>
								<InputNumber className="w-100" placeholder="Price" />
							</Form.Item>
							<Form.Item
								name={'discountPrice'}
								rules={[
									{ required: true, message: 'Please enter discounted price!' },
								]}
							>
								<InputNumber className="w-100" placeholder="Discount Price" />
							</Form.Item>
						</Space>
					</Col>
					<Col xs={24} md={9}>
						<Form.Item name={'imageUrls'} rules={[{ required: true }]}>
							<MyUploadComponent />
						</Form.Item>
						<Button type="primary" htmlType="submit" block>
							Create Listing
						</Button>
					</Col>
				</Row>
			</div>
		</Form>
	)
}

export default Listing
