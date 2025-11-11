import Plant from '../models/Plant.js'

export const getPlans = async (req, res) => {
  try {
    const plants = await Plant.find()
    res.status(200).json(plants)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//Add new plant
export const addPlant = async (req, res) => {
  const { name, category, price, stock, description, image } = req.body
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
    res.status(400).json({ message: error.message })
  }
}
