import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPlant } from '../features/plants/plantSlice'
import { fetchCategories } from '../features/categories/categorySlice'

const AddPlant = () => {
  const dispatch = useDispatch()
  const { data: categories } = useSelector((state) => state.categories)
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  })

  const [image, setImage] = useState(null)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

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
    formData.append('category', form.category)
    formData.append('price', form.price)
    formData.append('stock', form.stock)
    formData.append('description', form.description)
    formData.append('image', image)

    dispatch(addPlant(formData))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Plant</h2>

      <input
        type='text'
        name='name'
        placeholder='Name'
        onChange={handleChange}
      />
      <select name='category' onChange={handleChange}>
        <option value=''>Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <input name='price' placeholder='Price' onChange={handleChange} />
      <input name='stock' placeholder='Stock' onChange={handleChange} />
      <textarea
        name='description'
        placeholder='Description'
        onChange={handleChange}
      ></textarea>
      <input type='file' name='image' onChange={handleFileChange} />
      <button type='submit'>Add Plant</button>
    </form>
  )
}

export default AddPlant
