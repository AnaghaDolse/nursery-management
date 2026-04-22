import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlants } from '../features/plants/plantSlice'
import { deletePlant } from '../features/plants/plantSlice'

const PlantList = ({ setEditingPlant }) => {
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
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((plant) => (
            <tr key={plant._id}>
              <td>{plant.name}</td>
              <td>{plant.category?.name}</td>
              <td>{plant.price}</td>
              <td>{plant.stock}</td>
              <td>{plant.description}</td>
              <td>
                <img
                  src={`http://localhost:5000${plant.image}`}
                  alt={plant.name}
                  width='100'
                />
              </td>
              <td>
                <button onClick={() => dispatch(deletePlant(plant._id))}>
                  Delete
                </button>
                <button onClick={() => setEditingPlant(plant)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlantList
