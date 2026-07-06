import User from '../models/User.js'

export const addToCart = async (req, res) => {
  try {
    const { plantId } = req.body

    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }

    const existingItem = user.cart.find(
      (item) => item.plant.toString() === plantId,
    )
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      user.cart.push({ plant: plantId, quantity: 1 })
    }

    await user.save()
    return res
      .status(200)
      .json({ message: 'Plant added to cart', cart: user.cart })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.plant')
    if(!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json({ cart: user.cart })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}