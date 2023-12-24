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
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
	signInFailure,
	signInStart,
	signInSuccess,
} from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

function SignIn() {
	const dispatch = useDispatch()
	const { loading, error } = useSelector(state => state.user)
	let [form] = Form.useForm()
	const navigate = useNavigate()
	useEffect(() => {
		if (error) {
			message.error(error)
			return
		}

		return () => {
			clearInterval(error)
		}
	}, [error])
	const handleSubmit = async values => {
		dispatch(signInStart())
		try {
			const response = await axios.post('/api/auth/sign-in', values)
			message.success(response.data.message)
			dispatch(signInSuccess(response.data.rest))
			form.resetFields()
			navigate('/')
		} catch (error) {
			if (error && error.response && error.response.data) {
				dispatch(signInFailure(error.response.data.message))
			}
		}
	}

	return (
		<Flex align="center" style={{ minHeight: 'calc(100vh - 65px)' }}>
			<Card style={{ maxWidth: '600px', width: '100%', marginInline: 'auto' }}>
				<Space.Compact size="0" direction="vertical">
					<Typography.Title level={2} style={{ fontWeight: '800' }}>
						Sign In
					</Typography.Title>
					<Typography.Text className="fs-14">
						Unlock Your Dream Home: Sign In Today!
					</Typography.Text>
				</Space.Compact>
				<Form
					onFinish={handleSubmit}
					form={form}
					style={{ marginTop: '20px' }}
					autoComplete="false"
					layout="vertical"
				>
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
						Sign In
					</Button>
					<OAuth navigate={navigate} />
					<Typography.Text className="fs-15">
						Not an account ? <Link to={'/sign-up'}>Sign up</Link>
					</Typography.Text>
				</Form>
			</Card>
		</Flex>
	)
}

export default SignIn
