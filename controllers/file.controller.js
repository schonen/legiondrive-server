import File from '../models/file.model.js'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'

export const generatePublicLink = async (req, res) => {
  try {
    const file = await File.findById(req.params.id)

    if (!file || file.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' })
    }

    const token = crypto.randomBytes(16).toString('hex')
    file.publicLink = `${req.protocol}://${req.get('host')}/api/files/public/${token}`
    file.isPublic = true
    await file.save()

    res.json({ link: file.publicLink })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}

export const uploadFile = async (req, res) => {
  try {
    const file = new File({
      name: req.file.originalname,
      type: 'file',
      path: req.file.path,
      owner: req.user.id,
      size: req.file.size,
      mimeType: req.file.mimetype
    })
    await file.save()
    res.status(201).json({ message: 'Fichier téléversé', file })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}

export const listFiles = async (req, res) => {
  try {
    const files = await File.find({ owner: req.user.id })
    res.json(files)
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des fichiers' })
  }
}

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id)
    if (!file) return res.status(404).json({ message: 'Fichier non trouvé' })

    if (file.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Non autorisé' })
    }

    if (file.type === 'file') fs.unlinkSync(file.path)
    await file.deleteOne()

    res.json({ message: 'Fichier supprimé' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}
export const accessPublicFile = async (req, res) => {
  const token = req.params.token
  const file = await File.findOne({ publicLink: { $regex: token }, isPublic: true })
  if (!file) return res.status(404).json({ message: 'Fichier non trouvé ou lien expiré' })

  res.download(file.path, file.name)
}
export const shareFileWithUser = async (req, res) => {
  const { fileId, targetUserId, permission } = req.body

  if (!['read', 'write', 'download'].includes(permission)) {
    return res.status(400).json({ message: 'Permission invalide' })
  }

  const file = await File.findById(fileId)
  if (!file || file.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Accès refusé' })
  }

  file.sharedWith.push({ user: targetUserId, permission })
  await file.save()

  res.json({ message: 'Fichier partagé avec succès' })
}
