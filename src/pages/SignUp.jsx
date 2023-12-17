import { Button, Card, Flex, Form, Input, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
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
