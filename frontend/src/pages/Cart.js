import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, removeFromCart } from '../features/cart/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  let { cart, loading, error } = useSelector((state) => state.cart)
  console.log(cart)

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
              <button onClick={() => dispatch(removeFromCart(item.plant._id))}>
                Remove
              </button>
            </div>
          ))
      )}
    </div>
  )
}

export default Cart
