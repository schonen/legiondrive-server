import express from 'express'
import auth from '../middlewares/auth.js'
import { createPayment, getMyPayments } from '../controllers/payment.controller.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('💳 Bienvenue sur /api/payments (gestion des paiements)')
})

//  Paiement : souscription
router.post('/create', auth, createPayment)

//  Historique des paiements
router.get('/my', auth, getMyPayments)

export default router
