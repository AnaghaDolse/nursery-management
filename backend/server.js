import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import plantRoutes from './routes/plantRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import path from 'path'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')))

// MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch((err) => console.error('❌ MongoDB Connection Error:', err))

//Database Connection
connectDB()

// Default route
// app.get('/', (req, res) => {
//   res.send('Nursery Management API is running...🌱')
// })

//Routes
app.use('/api/plants', plantRoutes)
app.use('/api/categories', categoryRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
