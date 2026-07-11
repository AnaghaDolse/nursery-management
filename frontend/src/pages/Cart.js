import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, removeFromCart } from '../features/cart/cartSlice'
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
    <div>
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart
          .filter((item) => item.plant)
          .map((item) => (
            <div key={item.plant._id}>
              <img
                src={`http://localhost:5000${item.plant.image}`}
                alt={item.plant.name}
                width='100'
              />{' '}
              <h3>{item.plant.name}</h3> <p>₹{item.plant.price}</p>
              <p>Quantity: {item.quantity}</p>
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
              <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
            </div>
          ))
      )}
    </div>
  )
}

export default Cart
