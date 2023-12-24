import { Avatar, Flex, Image, Input, Layout, Space, Typography } from 'antd'
import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function AppHeader() {
	const { currentUser } = useSelector(state => state.user)
	console.log(currentUser)
	return (
		<Layout.Header className="custom__header">
			<Space className="justify-between w-100" wrap>
				<Space>
					<Typography.Title level={2} className="doodle">
						Dani - Estate
					</Typography.Title>
				</Space>
				<Space>
					<Input
						placeholder="Search..."
						size="large"
						suffix={<CiSearch size={25} />}
					/>
				</Space>
				<Space size={'large'}>
					<Link to={'/'} className="fs-16">
						Home
					</Link>
					<Link to={'/about'} className="fs-16">
						About
					</Link>
					{currentUser ? (
						<Link to={'/profile'}>
							<Avatar
								src={<Image preview={false} src={currentUser?.avatar} />}
								shape="square"
								size={40}
							/>
						</Link>
					) : (
						<Link to={'/sign-in'} className="fs-16">
							Sign in
						</Link>
					)}
				</Space>
			</Space>
		</Layout.Header>
	)
}

export default AppHeader
