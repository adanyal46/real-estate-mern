import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
	res.json({
		message: 'Hell world',
	})
}
export const updateUser = async (req, res, next) => {
	if (req.user.id !== req.params.id) {
		return next(errorHandler(401, 'You can only update your own account!'))
	}
	const updateFields = {}
	if (req.body.username) updateFields.username = req.body.username
	if (req.body.email) updateFields.email = req.body.email
	if (req.body.avatar) updateFields.avatar = req.body.avatar
	try {
		// If a new password is provided, hash it before storing
		if (req.body.password) {
			const salt = bcryptjs.genSaltSync(10)
			updateFields.password = bcryptjs.hashSync(req.body.password, salt)
		}

		// Update the user and return the new document
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: updateFields },
			{ new: true }
		)

		// If user not found, return an error
		if (!updatedUser) {
			return next(errorHandler(404, 'User not found'))
		}

		// Destructure to omit the password from the response
		const { password, ...rest } = updatedUser._doc

		// Respond with the updated user data (without the password)
		res.status(200).json(rest)
	} catch (error) {
		// Pass any errors to the error handling middleware
		next(error)
	}
}
export const deleteUser = async (req, res, next) => {
	if (req.user.id !== req.params.id) {
		return next(errorHandler(401, 'You can only delete your own account!'))
	}

	try {
		await User.findByIdAndDelete(req.params.id)
		res.status(200).json('User has been deleted!')
	} catch (error) {
		next(error)
	}
}
