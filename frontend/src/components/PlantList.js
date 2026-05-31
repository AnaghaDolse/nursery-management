import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlants } from '../features/plants/plantSlice'
import { deletePlant } from '../features/plants/plantSlice'
import { fetchCategories } from '../features/categories/categorySlice'
import {toast} from 'react-toastify'

const PlantList = ({ setEditingPlant }) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.plants)
  const { data: categories } = useSelector((state) => state.categories)
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    dispatch(fetchPlants())
    dispatch(fetchCategories())
  }, [dispatch])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  const filteredPlants = data.filter((plant) => {
    const matchesSearch = plant.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      selectedCategories.length === 0 ||
      plant.category.some((cat) => selectedCategories.includes(cat._id))

    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <h2>Plant List</h2>
      <div className='filter-container'>
        <div classNme='filter-top'>
          <input
            type='text'
            placeholder='Search plants...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setSelectedCategories([])
              setSearch('')
            }}
          >
            Reset All
          </button>
        </div>

        <div className='checkbox-group'>
          <h4>Filter by Category:</h4>
          {categories.map((cat) => (
            <label key={cat._id} style={{ marginRight: '10px' }}>
              <input
                type='checkbox'
                value={cat._id}
              checked={selectedCategories.includes(cat._id)}
              onChange={(e) => {
                const value = e.target.value

                if (e.target.checked) {
                  setSelectedCategories([...selectedCategories, value])
                } else {
                  setSelectedCategories(
                    selectedCategories.filter((id) => id !== value),
                  )
                }
              }}
            />
            {cat.name}
          </label>
        ))}</div>
        <button onClick={() => setSelectedCategories([])}>Clear Filters</button>
        <p>Active Filters: {selectedCategories.length} selected</p>
      </div>

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
          {filteredPlants.map((plant) => (
            <tr key={plant._id}>
              <td>{plant.name}</td>
              <td>
                {plant.category?.map((cat) => (
                  <span key={cat._id} className='category-tag'>
                    {cat.name}
                  </span>
                ))}
              </td>
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
                <button className='edit' onClick={() => setEditingPlant(plant)}>
                  Edit
                </button>
                <button
                  className='delete'
                  onClick={() => {
                    dispatch(deletePlant(plant._id))
                    toast.success('Plant deleted successfully!')
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlantList
