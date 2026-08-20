import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../api/axios'

const Checkout = () => {
  const navigate = useNavigate()

  const { cart } = useSelector((state) => state.cart)

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [loading, setLoading] = useState(false)

  const totalAmount = cart.reduce(
    (total, item) => total + item.plant.price * item.quantity,
    0,
  )

  const handleChange = (e) => {
    const { name, value } = e.target

    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    setLoading(true)

    try {
      await API.post('/orders', {
        shippingAddress,
      })
      toast.success('Order placed successfully!')

      navigate('/orders')
    } catch (error) {
      console.log(error)

      toast.error(error.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='auth-container'>
      <div className='auth-right'>
        <form className='auth-form' onSubmit={handleSubmit}>
          <h2>Checkout</h2>

          <p className='subtitle'>Enter your shipping details</p>

          <div className='input-group'>
            <label>Full Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter your full name'
              value={shippingAddress.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-group'>
            <label>Phone</label>
            <input
              type='tel'
              name='phone'
              placeholder='Enter your phone number'
              value={shippingAddress.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-group'>
            <label>Address</label>
            <input
              type='text'
              name='address'
              placeholder='Enter your address'
              value={shippingAddress.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-group'>
            <label>City</label>
            <input
              type='text'
              name='city'
              placeholder='Enter your city'
              value={shippingAddress.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-group'>
            <label>State</label>
            <input
              type='text'
              name='state'
              placeholder='Enter your state'
              value={shippingAddress.state}
              onChange={handleChange}
              required
            />
            <div className='input-group'>
              <label>Pincode</label>
              <input
                type='text'
                name='pincode'
                placeholder='Enter your pincode'
                value={shippingAddress.pincode}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <h3>Order Total: ₹{totalAmount.toFixed(2)}</h3>
            </div>

            <button className='login-btn' type='submit' disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
