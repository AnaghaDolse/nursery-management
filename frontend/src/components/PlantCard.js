import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { toggleFavorite } from '../features/plants/plantSlice'

const PlantCard = ({ plant }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { favorites } = useSelector((state) => state.plants)

  const isFav = favorites.includes(plant._id)

  return (
    <div className='plant-card'>
      <img src={`http://localhost:5000${plant.image}`} alt={plant.name} />

      <h3>{plant.name}</h3>

      <p>{plant.category?.map((cat) => cat.name).join(', ')}</p>

      <p>₹{plant.price}</p>

      <div className='actions'>
        {/* <button onClick={() => dispatch(toggleFavorite(plant._id))}>{isFav ? '❤️' : '🤍'}</button> */}
        <button disabled>{isFav ? '❤️' : '🤍'}</button>
        <button onClick={() => navigate(`/plant/${plant._id}`)}>View</button>
      </div>
    </div>
  )
}

export default PlantCard
