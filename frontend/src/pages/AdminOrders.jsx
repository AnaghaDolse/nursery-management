import { useEffect, useState } from 'react'
import API from '../api/axios'
import { toast } from 'react-toastify'
import './Orders.css'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const allowedTransitions = {
    Pending: ['Confirmed', 'Cancelled'],
    Confirmed: ['Shipped', 'Cancelled'],
    Shipped: ['Delivered'],
    Delivered: [],
    Cancelled: [],
  }

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

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await API.patch(`/orders/${orderId}/status`, {
        status,
      })

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? response.data.order : order,
        ),
      )
      toast.success('Order status updated successfully')
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to update order status',
      )
    }
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

            <div>
              <p>
                Status:{' '}
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </p>
              <h4>Items</h4>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                disabled={allowedTransitions[order.status].length === 0}
              >
                <option value={order.status}>{order.status}</option>
                {allowedTransitions[order.status].map((nextStatus) => (
                  <option key={nextStatus} value={nextStatus}>
                    {nextStatus}
                  </option>
                ))}
              </select>
            </div>

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
