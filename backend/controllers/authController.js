import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
