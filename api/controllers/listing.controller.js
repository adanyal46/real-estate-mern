import Listing from '../models/listing.model.js'
import { errorHandler } from '../utils/error.js'

export const createListing = async (req, res, next) => {
	try {
		const listing = await Listing.create(req.body)
		return res.status(201).json(listing)
	} catch (error) {
		next(error)
	}
}
export const getListing = async (req, res, next) => {
	try {
		const listing = await Listing.findById(req.params.id)
		if (!listing) {
			return next(errorHandler(401, 'Listing not found'))
		}
		return res.status(201).json(listing)
	} catch (error) {
		next(error)
	}
}
export const deleteListing = async (req, res, next) => {
	try {
		const listing = await Listing.findByIdAndDelete(req.params.id)
		if (!listing) {
			return next(errorHandler(401, 'Listing not found'))
		}
		return res.status(201).json('Listing Deleted Successfully')
	} catch (error) {
		next(error)
	}
}
