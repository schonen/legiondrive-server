// controllers/payment.controller.js
import Payment from '../models/payment.model.js'
import User from '../models/user.model.js'

// ✅ Nom correct : createPayment
export const createPayment = async (req, res) => {
  const { plan } = req.body
  const prices = { prenium: 10, entreprise: 20 }

  if (!['prenium', 'entreprise'].includes(plan)) {
    return res.status(400).json({ message: 'Plan invalide' })
  }

  try {
    const payment = await Payment.create({
      user: req.user.id,
      amount: prices[plan],
      plan,
      status: 'success'
    })

    const user = await User.findById(req.user.id)
    user.plan = plan
    await user.save()

    res.json({ message: 'Abonnement activé', payment })
  } catch (err) {
    res.status(500).json({ message: 'Erreur de paiement', error: err.message })
  }
}

export const getMyPayments = async (req, res) => {
  const payments = await Payment.find({ user: req.user.id })
  res.json(payments)
}
