import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PlantCard = ({ plant }) => {
  const navigate = useNavigate()
  const [isFav, setIsFav] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []
    return favs.includes(plant._id)
  })

  const toggleFav = () => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || []

    let updatedFavs

    if (favs.includes(plant._id)) {
      updatedFavs = favs.filter((id) => id !== plant._id)
    } else {
      updatedFavs = [...favs, plant._id]
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavs))
    setIsFav(!isFav)
  }

  return (
    <div className='plant-card'>
      <img src={`http://localhost:5000${plant.image}`} alt={plant.name} />

      <h3>{plant.name}</h3>

      <p>{plant.category?.map((cat) => cat.name).join(', ')}</p>

      <p>₹{plant.price}</p>

      <div className='actions'>
        <button onClick={toggleFav}>{isFav ? '❤️' : '🤍'}</button>
        <button onClick={() => navigate(`/plant/${plant._id}`)}>View</button>
      </div>
    </div>
  )
}

export default PlantCard
