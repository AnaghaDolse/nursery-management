import { useNavigate } from 'react-router-dom'

const PlantCard = ({ plant }) => {
  const navigate = useNavigate()

  return (
    <div className='plant-card'>
      <img src={`http://localhost:5000${plant.image}`} alt={plant.name} />

      <h3>{plant.name}</h3>

      <p>{plant.category?.map((cat) => cat.name).join(', ')}</p>

      <p>₹{plant.price}</p>

      <div className='actions'>
        <button>❤</button>
        <button onClick={() => navigate(`/${plant._id}`)}>View</button>
      </div>
    </div>
  )
}

export default PlantCard
