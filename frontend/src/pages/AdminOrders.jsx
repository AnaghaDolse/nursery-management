import { useEffect, useState } from 'react'
import API from '../api/axios'
import { toast } from 'react-toastify'
import './Orders.css'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders/admin')
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

  if (loading) {
    return <p>Loading orders...</p>
  }

  return (
    <div>
      <h2>Manage Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <h3>Order #{order._id}</h3>

            <p>
              Customer: <strong>{order.user?.name}</strong>
            </p>

            <p>Email: {order.user?.email}</p>

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
                  {item.name} × {item.quantity}
                </p>

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

export default AdminOrders
