import connectDB from './config/db.js'
import express from 'express'
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import fileRoutes from './routes/file.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/files', fileRoutes)

app.get('/', (req, res) => {
  res.send('🎉 Bienvenue sur l’API LegionDrive !');
});


app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
});
