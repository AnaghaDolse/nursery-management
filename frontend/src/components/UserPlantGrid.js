import { useDispatch, useSelector } from 'react-redux'
import PlantCard from './PlantCard'
import { fetchPlants } from '../features/plants/plantSlice'
import { useEffect } from 'react'

const UserPlantGrid = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.plants)

  useEffect(() => {
    dispatch(fetchPlants({ page: 1, limit: 10 }))
  }, [dispatch])

  if (loading) return <p>Loading...</p>

  return (
    <div className='grid'>
      {data?.map((plant) => (
        <PlantCard key={plant._id} plant={plant} />
      ))}
    </div>
  )
}

export default UserPlantGrid
