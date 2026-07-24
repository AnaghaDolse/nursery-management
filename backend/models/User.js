import mongoose, { mongo } from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetToken: {
      type: String,
    },
    passwordResetToken: {
      type: Date,
    },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant',
      },
    ],
    cart: [
      {
        plant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Plant',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },

  { timestamps: true },
)

const User = mongoose.model('User', userSchema)

export default User
