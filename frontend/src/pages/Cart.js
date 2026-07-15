import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCart,
  removeFromCart,
  updateQuantity,
} from '../features/cart/cartSlice'
import { toast } from 'react-toastify'

const Cart = () => {
  const dispatch = useDispatch()
  const { cart, loading, error } = useSelector((state) => state.cart)
  const totalAmount = cart.reduce(
    (total, item) => total + item.plant.price * item.quantity,
    0,
  )

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  if (loading) return <p>Loading...</p>

  return (
    <div className='cart-container'>
      <h2 className='cart-title'>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart
          .filter((item) => item.plant)
          .map((item) => (
            <div className='cart-card' key={item.plant._id}>
              <div className='card-image'>
                <img
                  src={`http://localhost:5000${item.plant.image}`}
                  alt={item.plant.name}
                  width='100'
                />{' '}
              </div>{' '}
              <div className='card-details'>
                <h3>{item.plant.name}</h3>{' '}
                <p className='price'>₹{item.plant.price}</p>
                <div>
                  <div className='quantity-section'></div>
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
                  >
                    ➕
                  </button>
                  <p>Quantity: {item.quantity}</p>
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
                  <p className='subtotal'>
                    Subtotal: ₹{(item.plant.price * item.quantity).toFixed(2)}
                  </p>
                </div>
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
      <div className='cart-total'>
        <h2>Total Amount: ₹{totalAmount.toFixed(2)}</h2>
        <button className='checkout-btn'>Proceed to Checkout</button>
      </div>
    </div>
  )
}

export default Cart
