import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  //  Rôle utilisateur
  role: { type: String, enum: ['user', 'admin'], default: 'user' },

  //  Informations d’abonnement
  plan: { type: String, enum: ['free', 'pro', 'premium'], default: 'free' },
  storageUsed: { type: Number, default: 0 }

}, { timestamps: true })

const User = mongoose.model('User', userSchema)
export default User
