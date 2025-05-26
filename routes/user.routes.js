import express from 'express'
import auth from '../middlewares/auth.js'
import { getProfile, updateProfile, listUsers } from '../controllers/user.controller.js'
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router()

// Routes protégées
router.get('/me', auth, getProfile)              
router.put('/me', auth, updateProfile)           
router.get('/all', auth, listUsers) 
router.get('/all', auth, isAdmin, listUsers)             

export default router
