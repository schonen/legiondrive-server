import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  plan: { type: String, enum: ['free', 'pro', 'premium'], required: true },
  status: { type: String, enum: ['success', 'pending', 'failed'], default: 'pending' },
  paymentDate: { type: Date, default: Date.now }
})

export default mongoose.model('Payment', paymentSchema)
