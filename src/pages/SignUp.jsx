import {
	Button,
	Card,
	Flex,
	Form,
	Input,
	Space,
	Typography,
	message,
} from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
	const [loading, setLoading] = useState(false)
	let [form] = Form.useForm()
	const navigate = useNavigate()
	const handleSubmit = async values => {
		try {
			setLoading(true)
			const response = await axios.post('/api/auth/sign-up', values)
			setLoading(false)
			message.success(response.data.message)
			form.resetFields()
			navigate('/sign-in')
		} catch (error) {
			if (error && error.response && error.response.data) {
				message.error(error.response.data.message)
			}

			setLoading(false)
		}
	}
	return (
		<Flex align="center" style={{ minHeight: 'calc(100vh - 65px)' }}>
			<Card style={{ maxWidth: '600px', width: '100%', marginInline: 'auto' }}>
				<Space.Compact size="0" direction="vertical">
					<Typography.Title level={2} style={{ fontWeight: '800' }}>
						Create an Account
					</Typography.Title>
					<Typography.Text className="fs-14">
						Unlock Your Dream Home: Sign Up Today!
					</Typography.Text>
				</Space.Compact>
				<Form
					onFinish={handleSubmit}
					form={form}
					style={{ marginTop: '20px' }}
					autoComplete="false"
					layout="vertical"
				>
					<Form.Item name={'username'} rules={[{ required: true }]}>
						<Input size="large" placeholder="Username" />
					</Form.Item>
					<Form.Item name={'email'} rules={[{ required: true, type: 'email' }]}>
						<Input size="large" placeholder="E-mail Address" />
					</Form.Item>
					<Form.Item name={'password'} rules={[{ required: true }]}>
						<Input.Password size="large" placeholder="Password" />
					</Form.Item>
					<Button
						loading={loading}
						htmlType="submit"
						style={{ marginBlock: '10px' }}
						size="large"
						type="primary"
						block
					>
						Sign Up
					</Button>
					<Typography.Text className="fs-15">
						Have an account ? <Link to={'/sign-in'}>Sign In</Link>
					</Typography.Text>
				</Form>
			</Card>
		</Flex>
	)
}

export default SignUp
