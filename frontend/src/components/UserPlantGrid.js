import { useSelector } from 'react-redux'
import PlantCard from './PlantCard'

const UserPlantGrid = () => {
  const { data, loading } = useSelector((state) => state.plants)

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
