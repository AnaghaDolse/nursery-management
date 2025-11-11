import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import plantRoutes from './routes/plantRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch((err) => console.error('❌ MongoDB Connection Error:', err))

//Database Connection
connectDB();

// Default route
// app.get('/', (req, res) => {
//   res.send('Nursery Management API is running...🌱')
// })

//Routes
app.use("/api/plants", plantRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
