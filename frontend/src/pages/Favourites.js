import { useSelector } from 'react-redux'
import PlantCard from '../components/PlantCard'
import { Navigate, useNavigate } from 'react-router-dom'

const Favourites = () => {
  const navigate = useNavigate()
  const { data } = useSelector((state) => state.plants)

  const faovuriteIds = JSON.parse(localStorage.getItem('favorites')) || []

  const favouritePlants = data.filter((plant) =>
    faovuriteIds.includes(plant._id),
  )
  // ✅ Add condition here
  if (favouritePlants.length === 0) {
    return (
      <div className='empty-state'>
        <h2>❤️ My Favorites</h2>

        <h3>No favorite plants yet!</h3>

        <p>Start exploring and save your favorite plants.</p>

        <button onClick={() => navigate('/add-plant')}>🌱 Browse Plants</button>
      </div>
    )
  }

  return (
    <div>
      <div className='favorites-header'>
        <h2>❤️ My Favorites</h2>

        <button onClick={() => navigate('/add-plant')}>← Back</button>
      </div>

      <p>
        {favouritePlants.length} favorite plant
        {favouritePlants.length > 1 ? 's' : ''}
      </p>

      <div className='plant-grid'>
        {favouritePlants.map((plant) => (
          <PlantCard key={plant._id} plant={plant} />
        ))}
      </div>
    </div>
  )
}

export default Favourites
