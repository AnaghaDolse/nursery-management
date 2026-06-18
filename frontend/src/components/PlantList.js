import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchPlants } from '../features/plants/plantSlice'
import { deletePlant } from '../features/plants/plantSlice'
import { fetchCategories } from '../features/categories/categorySlice'
import { toast } from 'react-toastify'

const PlantList = ({ setEditingPlant }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
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
  const [selectedPlants, setSelectedPlants] = useState([])
  const [sortOptions, setSortOptions] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const limit = 5
  const start = (currentPage - 1) * limit + 1
  const end = Math.min(currentPage * limit, total)

  useEffect(() => {
    dispatch(
      fetchPlants({
        page: currentPage,
        limit: 5,
        search: debounceSearch,
        selectedCategories,
      }),
    )
    dispatch(fetchCategories())
  }, [dispatch, currentPage, debounceSearch, selectedCategories])

  useEffect(() => {
    if (currentPage > pages) {
      setCurrentPage(pages)
    }
  }, [pages])

  useEffect(() => {
    setCurrentPage(1)
  }, [debounceSearch, selectedCategories])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  if (loading) {
    return (
      <div>
        <h2>Plant List</h2>
        {[...Array(5)].map((_, index) => (
          <div key={index} className='skeleton-row'></div>
        ))}
      </div>
    )
  }

  if (error) return <p>Error: {error}</p>

  const sortedPlants = [...(data || [])].sort((a, b) => {
    if (sortOptions === 'price-asc') return a.price - b.price
    if (sortOptions === 'price-desc') return b.price - a.price
    if (sortOptions === 'stock-asc') return a.stock - b.stock
    if (sortOptions === 'stock-desc') return b.stock - a.stock
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
      <select onChange={(e) => setSortOptions(e.target.value)}>
        <option value=''>Sort By</option>
        <option value='price-asc'>Price: Low to High</option>
        <option value='price-desc'>Price: High to Low</option>
        <option value='stock-asc'>Stocks: Low to High</option>
        <option value='stock-desc'>Stocks: High to Low</option>
      </select>
      {user?.role === 'admin' && (
        <button
          className='delete'
          disabled={selectedPlants.length === 0}
          onClick={() => {
            const confirmDelete = window.confirm(
              'Are you sure you want to delete selected plants?',
            )

            if (confirmDelete) {
              Promise.all(
                selectedPlants.map((id) => dispatch(deletePlant(id))),
              ).then(() => {
                dispatch(
                  fetchPlants({
                    page: currentPage,
                    limit: 5,
                    search: debounceSearch,
                    selectedCategories,
                  }),
                )
                toast.success('Selected plants deleted successfully!')
                setSelectedPlants([])
              })
            }
          }}
        >
          Delete Selected
        </button>
      )}
      <table border='1'>
        <thead>
          <tr>
            <th>Select</th> <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlants.map((plant) => (
            <tr key={plant._id}>
              <td>
                <input
                  type='checkbox'
                  checked={selectedPlants.includes(plant._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPlants([...selectedPlants, plant._id])
                    } else {
                      setSelectedPlants(
                        selectedPlants.filter((id) => id !== plant._id),
                      )
                    }
                  }}
                />
              </td>
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
                {user?.role === 'admin' && (
                  <>
                    <button
                      className='edit'
                      onClick={() => setEditingPlant(plant)}
                    >
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
                            dispatch(
                              fetchPlants({
                                page: currentPage,
                                limit: 5,
                                search: debounceSearch,
                                selectedCategories,
                              }),
                            )
                            toast.success('Plant deleted successfully!')
                          })
                        }
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
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
