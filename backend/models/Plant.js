import mongoose from 'mongoose'

const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
)

const Plant = mongoose.model('Plant', plantSchema)
export default Plant
