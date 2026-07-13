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

    const updatedUser = await User.findById(req.user.id).populate('cart.plant')

    return res.status(200).json({
      message: 'Plant added to cart',
      cart: updatedUser.cart,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.plant')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json({ cart: user.cart })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const removeFromCart = async (req, res) => {
  try {
    const { plantId } = req.params

    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.cart = user.cart.filter((item) => item.plant.toString() !== plantId)

    await user.save()
    return res
      .status(200)
      .json({ message: 'Plant removed from cart', cart: user.cart })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateQuantity = async (req, res) => {
  try {
    const { plantId } = req.params
    const { action } = req.body

    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const item = user.cart.find((i) => i.plant.toString() === plantId)

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' })
    }

    if (action === 'increase') {
      item.quantity += 1
    } else if (action === 'decrease') {
      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        user.cart = user.cart.filter((i) => i.plant.toString() !== plantId)
      }
    }

    await user.save()

    const updatedUser = await User.findById(req.user.id).populate('cart.plant')

    return res.status(200).json({
      message: 'Cart updated successfully',
      cart: updatedUser.cart,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}