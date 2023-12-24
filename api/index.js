import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
app.use(express.json({ limit: '5mb' }))
app.use(cookieParser())
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
app.use('/api/listing', listingRouter)
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500
	const message = err.message || 'Internal Server Error'
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	})
})
app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
