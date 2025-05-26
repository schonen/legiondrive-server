import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const JWT_SECRET = process.env.JWT_SECRET

export const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'Utilisateur déjà existant' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword })

    res.status(201).json({ message: 'Utilisateur créé', user: { id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l’inscription', error: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe invalide' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe invalide' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: err.message })
  }
}
