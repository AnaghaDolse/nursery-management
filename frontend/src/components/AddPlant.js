import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPlant, updatePlant } from '../features/plants/plantSlice'
import { fetchCategories } from '../features/categories/categorySlice'

const AddPlant = ({ editingPlant, setEditingPlant }) => {
  const dispatch = useDispatch()
  const { data: categories } = useSelector((state) => state.categories)
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
  })
  const [selectedCategories, setSelectedCategories] = useState([])
  const [image, setImage] = useState(null)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    if (editingPlant) {
      setForm({
        name: editingPlant.name,
        price: editingPlant.price,
        stock: editingPlant.stock,
        description: editingPlant.description,
      })
      setSelectedCategories(editingPlant.category?.map((cat) => cat._id) || [])
    }
  }, [editingPlant])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('category', JSON.stringify(selectedCategories))
    formData.append('price', form.price)
    formData.append('stock', form.stock)
    formData.append('description', form.description)

    if (image) {
      formData.append('image', image)
    }

    if (editingPlant) {
      dispatch(
        updatePlant({
          id: editingPlant._id,
          updatedData: formData,
        }),
      )
      setEditingPlant(null)
    } else {
      dispatch(addPlant(formData))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Plant</h2>

      <input
        type='text'
        name='name'
        placeholder='Name'
        value={form.name}
        onChange={handleChange}
      />
      <select
        multiple
        value={selectedCategories}
        onChange={(e) =>
          setSelectedCategories(
            Array.from(e.target.selectedOptions, (option) => option.value),
          )
        }
      >
        <option value=''>Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        name='price'
        value={form.price}
        placeholder='Price'
        onChange={handleChange}
      />
      <input
        name='stock'
        value={form.stock}
        placeholder='Stock'
        onChange={handleChange}
      />
      <textarea
        name='description'
        placeholder='Description'
        value={form.description}
        onChange={handleChange}
      ></textarea>
      <input type='file' name='image' onChange={handleFileChange} />
      <button type='submit' className='add'>
        {editingPlant ? 'Update Plant' : 'Add Plant'}
      </button>
    </form>
  )
}

export default AddPlant
