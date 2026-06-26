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
      <div>
        <h2>My Favourites ❤️</h2>
        <p>No favourite plants yet.</p>
        <p>Click the ❤️ button on a plant to add it here.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>My Favourites</h2>

      <button onClick={() => navigate('/add-plant')}>← Back to plant</button>

      <div className='plant-grid'>
        {favouritePlants.map((plant) => (
          <PlantCard key={plant._id} plant={plant} />
        ))}
      </div>
    </div>
  )
}

export default Favourites
