import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
dotenv.config()
const app = express()
mongoose
	.connect(process.env.MONGO)
	.then(res => {
		console.log('Mongo Db Connected Successfully')
	})
	.catch(err => {
		console.log('Mongo Db error')
	})
app.use('/api/user', userRouter)
app.listen(3000, () => {
	console.log('Server is running on port 3000')
})
