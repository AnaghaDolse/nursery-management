import { useEffect, useState } from 'react'
import API from '../api/axios'
import { toast } from 'react-toastify'

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

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <h3>Order #{order._id}</h3>

            <p>
              Status: <strong>{order.status}</strong>
            </p>

            <p>Total: ₹{order.totalAmount.toFixed(2)}</p>

            <h4>Items</h4>

            {order.items.map((item) => (
              <div key={item._id}>
                <p>
                  {item.name} x {item.quantity}
                </p>{' '}
                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}

            <hr />
          </div>
        ))
      )}
    </div>
  )
}

export default Orders
