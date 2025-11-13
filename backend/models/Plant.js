import mongoose from 'mongoose'

const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
)

const Plant = mongoose.model('Plant', plantSchema)
export default Plant
