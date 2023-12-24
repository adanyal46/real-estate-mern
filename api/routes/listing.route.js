import express from 'express'
import {
	createListing,
	getListing,
	deleteListing,
} from '../controllers/listing.controller.js'
import { verifyUser } from '../utils/verifyUser.js'
const router = express.Router()

router.post('/create', verifyUser, createListing)
router.delete('/delete/:id', verifyUser, deleteListing)
router.get('/get/:id', verifyUser, getListing)
export default router
