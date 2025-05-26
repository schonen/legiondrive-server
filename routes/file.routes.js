import express from 'express'
import auth from '../middlewares/auth.js'
import upload from '../middlewares/upload.js'
import { uploadFile, listFiles, deleteFile } from '../controllers/file.controller.js'

const router = express.Router()

router.post('/upload', auth, upload.single('file'), uploadFile)
router.get('/', auth, listFiles)
router.delete('/:id', auth, deleteFile)

export default router
