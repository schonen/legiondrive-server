import express from 'express'
import auth from '../middlewares/auth.js'
import { subscribe, getMyPayments } from '../controllers/payment.controller.js'


const router = express.Router()

router.post('/subscribe', auth, subscribe)
router.get('/history', auth, getMyPayments)

export default router
