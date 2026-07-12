import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleFavorite } from '../features/plants/plantSlice'
import { addToCart } from '../features/cart/cartSlice'
import { toast } from 'react-toastify'

const PlantCard = ({ plant }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { favorites } = useSelector((state) => state.plants)
  const { cart } = useSelector((state) => state.cart)

  const isFav = favorites.some((favorite) => favorite._id === plant._id)
  const isInCart = cart.some((item) => item.plant._id === plant._id)

  return (
    <div className='plant-card'>
      <img src={`http://localhost:5000${plant.image}`} alt={plant.name} />

      <h3>{plant.name}</h3>

      <p>{plant.category?.map((cat) => cat.name).join(', ')}</p>

      <p>₹{plant.price}</p>

      <div className='actions'>
        <button onClick={() => dispatch(toggleFavorite(plant._id))}>
          {isFav ? '❤️' : '🤍'}
        </button>
        <button onClick={() => navigate(`/plant/${plant._id}`)}>View</button>
        <button
          onClick={() =>
            dispatch(addToCart(plant._id))
              .unwrap()
              .then(() => {
                toast.success('Item added to cart successfully!')
              })
              .catch((error) => {
                toast.error(error)
              })
          }
          disabled={isInCart}
        >
          {isInCart ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default PlantCard
