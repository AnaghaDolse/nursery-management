import User from '../models/User.js'
import Order from '../models/Order.js'

export const createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.plant')

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    if (user.cart.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty',
      })
    }

    const { shippingAddress } = req.body

    if (!shippingAddress) {
      return res.status(400).json({
        message: 'Shipping address is required',
      })
    }

    const items = user.cart.map((item) => ({
      plant: item.plant._id,
      name: item.plant.name,
      price: item.plant.price,
      quantity: item.quantity,
    }))

    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )

    const order = await Order.create({
      user: user._id,
      items,
      totalAmount,
      shippingAddress,
    })

    user.cart = []

    await user.save()

    return res.status(201).json({
      message: 'Order placed successfully',
      order,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 })

    return res.status(200).json({
      orders,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      orders,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body

    const allowedStatuses = [
      'Pending',
      'Confirmed',
      'Shipped',
      'Delivered',
      'Cancelled',
    ]

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid order status',
      })
    }

    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      })
    }

    order.status = status

    await order.save()

    return res.status(200).json({
      message: 'Order status updated successfully',
      order,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}
