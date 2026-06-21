import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPlantById } from '../features/plants/plantSlice'

const PlantDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { selectedPlant, loading } = useSelector((state) => state.plants)

  useEffect(() => {
    dispatch(fetchPlantById(id))
  }, [dispatch, id])

  if (loading) return <p>Loading...</p>

  if (!selectedPlant) return <p>Plant Not Found</p>

  return (
    <div className='details'>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <img
        src={`http://localhost:5000${selectedPlant.image}`}
        alt={selectedPlant.name}
      />

      <h2>{selectedPlant.name}</h2>

      <p>{selectedPlant.category?.map((c) => c.name).join(',')}</p>
      <p>₹{selectedPlant.price}</p>
      <p>{selectedPlant.description}</p>
    </div>
  )
}

export default PlantDetails
