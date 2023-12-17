import { Button, message } from 'antd'
import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'

function OAuth({ navigate }) {
	const dispatch = useDispatch()
	const handleGoogleClick = async () => {
		try {
			const provider = new GoogleAuthProvider()
			const auth = getAuth(app)
			const result = await signInWithPopup(auth, provider)
			const user = {
				username: result.user.displayName,
				email: result.user.email,
				photo: result.user.photoURL,
			}
			const response = await axios.post('/api/auth/google', user)
			message.success(response.data.message)
			dispatch(signInSuccess(response.data.rest))
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Button
			type="primary"
			onClick={handleGoogleClick}
			size="large"
			style={{ background: '#dc4545' }}
			block
		>
			Continue with google
		</Button>
	)
}

export default OAuth
