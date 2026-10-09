import User from '../models/User.js'
import Order from '../models/Order.js'
import Plant from '../models/Plant.js'

// export const createOrder = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).populate('cart.plant')

//     if (!user) {
//       return res.status(404).json({
//         message: 'User not found',
//       })
//     }

//     if (user.cart.length === 0) {
//       return res.status(400).json({
//         message: 'Cart is empty',
//       })
//     }

//     const { shippingAddress } = req.body

//     if (!shippingAddress) {
//       return res.status(400).json({
//         message: 'Shipping address is required',
//       })
//     }

//     for (const item of user.cart) {
//       if (item.quantity > item.plant.stock) {
//         return res.status(400).json({
//           message: `Insufficient stock for ${item.plant.name}`,
//         })
//       }
//     }

//     const items = user.cart.map((item) => ({
//       plant: item.plant._id,
//       name: item.plant.name,
//       price: item.plant.price,
//       quantity: item.quantity,
//     }))

//     const totalAmount = items.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0,
//     )

//     const order = await Order.create({
//       user: user._id,
//       items,
//       totalAmount,
//       shippingAddress,
//     })

//     for (const item of user.cart) {
//       await Plant.findByIdAndUpdate(item.plant._id, {
//         $inc: { stock: -item.quantity },
//       })
//     }

//     user.cart = []

//     await user.save()

//     return res.status(201).json({
//       message: 'Order placed successfully',
//       order,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     })
//   }
// }

export const createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.plant')

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty',
      })
    }

    const { shippingAddress } = req.body

    if (
      !shippingAddress ||
      typeof shippingAddress !== 'object' ||
      Array.isArray(shippingAddress)
    ) {
      return res.status(400).json({
        message: 'A valid shipping address is required',
      })
    }

    // Validate required shipping address fields.
    const requiredFields = [
      'name',
      'phone',
      'address',
      'city',
      'state',
      'pincode',
    ]

    for (const field of requiredFields) {
      if (
        typeof shippingAddress[field] !== 'string' ||
        !shippingAddress[field].trim()
      ) {
        return res.status(400).json({
          message: `${field} is required in the shipping address`,
        })
      }
    }

    // Validate cart items and current plant stock.
    for (const item of user.cart) {
      if (!item.plant) {
        return res.status(400).json({
          message: 'A plant in your cart no longer exists',
        })
      }

      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        return res.status(400).json({
          message: `Invalid quantity for ${item.plant.name}`,
        })
      }

      if (item.plant.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.plant.name}. Available: ${item.plant.stock}`,
        })
      }
    }

    // Calculate prices using trusted database values.
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

    // Decrease stock only if enough stock remains at update time.
    for (const item of user.cart) {
      const updatedPlant = await Plant.findOneAndUpdate(
        {
          _id: item.plant._id,
          stock: { $gte: item.quantity },
        },
        {
          $inc: { stock: -item.quantity },
        },
        {
          new: true,
        },
      )

      if (!updatedPlant) {
        // Roll back the order if stock is no longer available.
        await Order.findByIdAndDelete(order._id)

        return res.status(400).json({
          message: `Insufficient stock for ${item.plant.name}. Please refresh your cart and try again.`,
        })
      }
    }

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

    const allowedTransitions = {
      Pending: ['Confirmed', 'Cancelled'],
      Confirmed: ['Shipped', 'Cancelled'],
      Shipped: ['Delivered'],
      Delivered: [],
      Cancelled: [],
    }

    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      })
    }

    if (!allowedTransitions[order.status]?.includes(status)) {
      return res.status(400).json({
        message: 'Cannot change order status from ${order.status} to ${status}',
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
