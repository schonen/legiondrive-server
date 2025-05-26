import User from '../models/user.model.js'

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès interdit : admin uniquement' })
    }
    next()
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}

export default isAdmin
