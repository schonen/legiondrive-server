import User from '../models/user.model.js'

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}

export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du listing', error: err.message })
  }
}

export const updateProfile = async (req, res) => {
  const { name, email } = req.body
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' })

    user.name = name || user.name
    user.email = email || user.email
    await user.save()

    res.json({ message: 'Profil mis à jour', user })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}
