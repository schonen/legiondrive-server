import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' })
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET)
    req.user = verified  
    next()
  } catch (err) {
    res.status(400).json({ message: 'Token invalide.' })
  }
}

export default auth
