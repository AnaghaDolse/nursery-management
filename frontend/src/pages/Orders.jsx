import { useEffect, useState } from 'react'
import API from '../api/axios'
import { toast } from 'react-toastify'
import '../pages/Orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders')
      setOrders(response.data.orders)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'

    const parsedDate = new Date(date)

    if (isNaN(parsedDate.getTime())) {
      return 'Invalid Date'
    }

    return parsedDate.toLocaleDateString('em-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) {
    return <p>Loading orders...</p>
  }

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <h3>Order #{order._id}</h3>

            <p>Order Date: {formatDate(order.createdAt)}</p>

            <p>
              Status:{' '}
              <span className={`status-badge ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </p>

            <h4>Items</h4>

            {order.items.map((item) => (
              <div key={item._id}>
                <p>
                  {item.name} x {item.quantity}
                </p>{' '}
                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}

            <h4>Shipping Address</h4>

            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
              {order.shippingAddress.pincode}
            </p>

            <h3>Total: ₹{order.totalAmount.toFixed(2)}</h3>

            <hr />
          </div>
        ))
      )}
    </div>
  )
}

export default Orders
