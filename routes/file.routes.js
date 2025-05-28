import express from 'express'
import auth from '../middlewares/auth.js'
import upload from '../middlewares/upload.js'
import { uploadFile, listFiles, deleteFile } from '../controllers/file.controller.js'
import { generatePublicLink, accessPublicFile, shareFileWithUser } from '../controllers/file.controller.js'

const router = express.Router()

router.post('/upload', auth, upload.single('file'), uploadFile)
router.get('/', auth, listFiles)
router.delete('/:id', auth, deleteFile)
router.get('/public/:token', accessPublicFile)
router.post('/share', auth, shareFileWithUser)
router.get('/share/:id', auth, generatePublicLink)
router.get('/', (req, res) => {
  res.send('📁 Bienvenue sur /api/files (gestion des fichiers)');
});



export default router

