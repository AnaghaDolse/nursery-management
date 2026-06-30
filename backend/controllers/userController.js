import User from '../models/User.js'

export const toggleFavorite = async (req, res) => {
  try {
    const { plantId } = req.params

    const user = await User.findById(req.user.id)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
