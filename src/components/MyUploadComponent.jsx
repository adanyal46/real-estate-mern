import React, { useState } from 'react'
import { Upload, Button, Typography, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const MyUploadComponent = () => {
	const [fileList, setFileList] = useState([])
	const [imageUrls, setImageUrls] = useState([])

	const handlePreview = file => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			setImageUrls(prevUrls => [...prevUrls, reader.result])
		}
	}

	const handleChange = ({ file, fileList: newFileList }) => {
		setFileList(newFileList)
		if (file.status === 'done') {
			handlePreview(file.originFileObj)
		}
	}
	return (
		<div>
			<Space style={{ marginBottom: '20px' }}>
				<Typography.Title className="my-0" level={3}>
					Image:
				</Typography.Title>
				<Typography.Text type="secondary">
					The first image will be cover (max 6)
				</Typography.Text>
			</Space>
			<Upload
				action={false}
				onChange={handleChange}
				fileList={fileList}
				multiple={true}
				listType="picture-card"
				onPreview={handlePreview}
				beforeUpload={() => false}
			>
				{fileList.length < 6 && (
					<div>
						<UploadOutlined style={{ fontSize: '24px' }} />
						<div
							style={{
								marginTop: 8,
							}}
						>
							Upload
						</div>
					</div>
				)}
			</Upload>
			<div>
				{imageUrls.map((url, index) => (
					<img
						key={index}
						src={url}
						alt={`img-${index}`}
						style={{ width: '100px', margin: '10px' }}
					/>
				))}
			</div>
		</div>
	)
}

export default MyUploadComponent
