import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.route.js'
dotenv.config()
const app = express()
app.use(express.json({ limit: '5mb' }))
mongoose
	.connect(process.env.MONGO)
	.then(res => {
		console.log('Mongo Db Connected Successfully')
	})
	.catch(err => {
		console.log('Mongo Db error')
	})
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
