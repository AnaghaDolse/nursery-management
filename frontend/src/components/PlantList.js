import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlants } from '../features/plants/plantSlice'

const PlantList = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.plants)

  useEffect(() => {
    dispatch(fetchPlants())
  }, [dispatch])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Plant List</h2>
      <table border='1'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((plant) => (
            <tr key={plant._id}>
              <td>{plant.name}</td>
              <td>{plant.category?.name}</td>
              <td>{plant.price}</td>
              <td>{plant.stock}</td>
              <td>
                <img
                  src={`http://localhost:5000${plant.image}`}
                  alt={plant.name}
                  width='100'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlantList
