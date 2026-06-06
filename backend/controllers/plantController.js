import Plant from '../models/Plant.js'

// Get all plants
export const getPlants = async (req, res) => {
  try {
    let page = parseInt(req.query.page)
    if (!page || page < 1) page = 1

    const limit = parseInt(req.query.limit) || 5

    const skip = (page - 1) * limit

    const search = req.query.search || ''
    const category = req.query.category || ''
    let query = {}
    if (search) {
      query.name = { $regex: search, $options: 'i' }
    }

    if (category) {
      query.category = category
    }

    const total = await Plant.countDocuments(query)

    const pages = Math.ceil(total / limit)

    const plants = await Plant.find(query)
      .populate('category')
      .skip(skip)
      .limit(limit)

    res.status(200).json({ plants, total, page, pages })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Add new plant
export const addPlant = async (req, res) => {
  const { name, price, stock, description } = req.body

  //parse category array
  const category = JSON.parse(req.body.category)
    ? JSON.parse(req.body.category)
    : []

  const image = req.file ? `/uploads/${req.file.filename}` : null

  try {
    const newPlant = new Plant({
      name,
      category,
      price,
      stock,
      description,
      image,
    })

    await newPlant.save()
    res.status(201).json(newPlant)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
}

// Update plant
export const updatePlant = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, stock, description } = req.body

    const updatedData = {
      name,
      price,
      stock,
      description,
    }

    if (req.body.category) {
      updatedData.category = JSON.parse(req.body.category)
    }

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`
    }

    const updatedPlant = await Plant.findByIdAndUpdate(id, updatedData, {
      new: true,
    })

    if (!updatedPlant) {
      return res.status(404).json({ message: 'Plant not found' })
    }

    res.status(200).json({
      message: 'Plant updated successfully',
      plant: updatedPlant,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete plant
export const deletePlant = async (req, res) => {
  try {
    const { id } = req.params

    const deletedPlant = await Plant.findByIdAndDelete(id)

    if (!deletedPlant) {
      return res.status(404).json({ message: 'Plant not found' })
    }

    res.status(200).json({ message: 'Plant deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
