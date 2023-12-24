import React, { useEffect, useState } from 'react'
import {
	Avatar,
	Button,
	Card,
	Flex,
	List,
	Popconfirm,
	Skeleton,
	message,
} from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
const count = 3
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`
const ListingList = () => {
	const { currentUser } = useSelector(state => state.user)
	const [data, setData] = useState([])
	const [listingShow, setListingShow] = useState(false)

	useEffect(() => {
		getUserListing()
	}, [])
	const getUserListing = async () => {
		const response = await axios.get('/api/user/listing/' + currentUser?._id)
		setData(response.data)
	}
	const handleDeleteListing = async id => {
		try {
			const response = await axios.delete('/api/listing/delete/' + id)
			message.success(response.data)
			getUserListing()
		} catch (error) {}
	}
	return (
		<>
			{listingShow ? (
				<List
					style={{ paddingTop: '20px' }}
					className="demo-loadmore-list"
					itemLayout="horizontal"
					dataSource={data}
					renderItem={item => (
						<Card
							bodyStyle={{ padding: '10px' }}
							style={{ marginBottom: '20px' }}
						>
							<List.Item
								actions={[
									<Flex vertical>
										<Link
											style={{ fontSize: '16px', color: 'blueviolet' }}
											to={`/update-listing/${item._id}`}
										>
											Edit
										</Link>
										<Popconfirm
											title="Are you sure you want to delete this listing?"
											onConfirm={() => handleDeleteListing(item._id)}
											okText="Yes"
											cancelText="No"
										>
											<Button style={{ color: '#ff4d4f' }} type="link">
												Delete
											</Button>
										</Popconfirm>
									</Flex>,
								]}
							>
								<List.Item.Meta
									avatar={
										<Avatar size={50} shape="square" src={item.imageUrls[0]} />
									}
									title={item.name}
									description={item.description}
								/>
							</List.Item>
						</Card>
					)}
				/>
			) : (
				<Button
					type="dashed"
					onClick={() => setListingShow(true)}
					block
					style={{ marginBlock: '15px' }}
				>
					View Listing
				</Button>
			)}
		</>
	)
}
export default ListingList
