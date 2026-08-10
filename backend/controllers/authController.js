import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { sendEmail } from '../utils/sendEmail.js'

//SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    //check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    //create user
    const user = new User({ name, email, password: hashedPassword })

    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    //find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }

    //create token
    const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', {
      expiresIn: '1d',
    })

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    //Check if user exists
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    //Generate reset toen
    const resetToken = crypto.randomBytes(32).toString('hex')

    //Save token and expiry
    user.passwordResetToken = resetToken
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000

    await user.save()

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`

    const message = `You requested a password reset.
    
    Click the link below to reset your password:
    
    ${resetUrl}
    
    If you did not request this request, please ignore this email.`

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message,
    })

    return res.status(200).json({
      message: 'Reset generated successfully',
      resetToken,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired reset token',
      })
    }
    user.password = await bcrypt.hash(password, 10)

    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    return res.status(200).json({
      message: 'Password reset successfully',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}
