import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCart,
  removeFromCart,
  updateQuantity,
} from '../features/cart/cartSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cart, loading, error } = useSelector((state) => state.cart)

  const validCart = cart.filter((item) => item.plant)

  const totalAmount = validCart.reduce(
    (total, item) => total + item.plant.price * item.quantity,
    0,
  )

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  if (loading) return <p>Loading...</p>

  return (
    <div className='cart-container'>
      <button
        className='back-plants-btn'
        onClick={() => navigate('/add-plant')}
      >
        ← Continue Shopping
      </button>
      <h2 className='cart-title'>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        validCart.map((item) => (
          <div className='cart-card' key={item.plant._id}>
            <div className='cart-image'>
              <img
                src={`http://localhost:5000${item.plant.image}`}
                alt={item.plant.name}
                width='100'
              />{' '}
            </div>{' '}
            <div className='card-details'>
              <h3>{item.plant.name}</h3>{' '}
              <p className='price'>₹{item.plant.price}</p>
              <div className='quantity-section'>
                <button
                  className='qty-btn'
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        plantId: item.plant._id,
                        action: 'decrease',
                      }),
                    )
                  }
                >
                  ➖
                </button>
                <p>Quantity: {item.quantity}</p>
                <button
                  className='qty-btn'
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        plantId: item.plant._id,
                        action: 'increase',
                      }),
                    )
                  }
                  disabled={item.quantity >= item.plant.stock}
                >
                  ➕
                </button>{' '}
              </div>
              <p className='stock-info'>
                {item.quantity >= item.plant.stock
                  ? 'Maximum available quantity reached'
                  : `${item.plant.stock} available in stock`}
              </p>
              <p className='subtotal'>
                Subtotal: ₹{(item.plant.price * item.quantity).toFixed(2)}
              </p>
              <button
                className='delete'
                onClick={() => {
                  dispatch(removeFromCart(item.plant._id))
                    .unwrap()
                    .then(() => {
                      toast.success('Item removed from cart successfully!')
                    })
                    .catch((error) => {
                      toast.error(error)
                    })
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      {validCart.length > 0 && (
        <div className='cart-total'>
          <h2>Total Amount: ₹{totalAmount.toFixed(2)}</h2>
          <button className='login-btn' onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
