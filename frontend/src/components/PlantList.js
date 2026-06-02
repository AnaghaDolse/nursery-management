import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlants } from '../features/plants/plantSlice'
import { deletePlant } from '../features/plants/plantSlice'
import { fetchCategories } from '../features/categories/categorySlice'
import { toast } from 'react-toastify'

const PlantList = ({ setEditingPlant }) => {
  const dispatch = useDispatch()
  const { data, loading, error, pages, total } = useSelector(
    (state) => state.plants,
  )
  const pageNumbers = []
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i)
  }
  const { data: categories } = useSelector((state) => state.categories)
  const [search, setSearch] = useState('')
  const [debounceSearch, setDebounceSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const limit = 5
  const start = (currentPage - 1) * limit + 1
  const end = Math.min(currentPage * limit, total)

  useEffect(() => {
    dispatch(fetchPlants({ page: currentPage, limit: 5 }))
    dispatch(fetchCategories())
  }, [dispatch, currentPage])

  useEffect(() => {
    if (currentPage > pages) {
      setCurrentPage(pages)
    }
  }, [pages])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  const filteredPlants = (data || []).filter((plant) => {
    const matchesSearch = plant.name
      .toLowerCase()
      .includes(debounceSearch.toLowerCase())

    const matchesCategory =
      selectedCategories.length === 0 ||
      plant.category.some((cat) => selectedCategories.includes(cat._id))

    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <h2>Plant List</h2>
      <div className='filter-container'>
        <div className='filter-top'>
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
          ))}
        </div>
        <button onClick={() => setSelectedCategories([])}>Clear Filters</button>
        <p>Active Filters: {selectedCategories.length} selected</p>
      </div>
      <p>
        Showing {start} to {end} of {total} results
      </p>
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
                    const confirmDelete = window.confirm(
                      'Are you sure you want to delete this plant?',
                    )
                    if (confirmDelete) {
                      dispatch(deletePlant(plant._id)).then(() => {
                        dispatch(fetchPlants({ page: currentPage, limit: 5 }))
                        toast.success('Plant deleted successfully!')
                      })
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={loading || currentPage === 1}
        >
          Prev
        </button>
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            style={{ fontWeight: currentPage === num ? 'bold' : 'normal' }}
          >
            {num}
          </button>
        ))}
        <button
          disabled={loading || currentPage === pages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages))}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PlantList
