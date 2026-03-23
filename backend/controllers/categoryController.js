import Category from '../models/Category'

// @desc    Create new category
// @route   POST /api/categories
// @access  Public (later you can make it Admin only)

export const createCategory = async (req, res) => {
  try {
    let { name, description } = req.body

    // 1️⃣ Basic validation
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Category name is required',
      })
    }

    // 2️⃣ Clean the input
    name = name.trim()

    // 3️⃣ Check duplicate manually (better control)
    const existingCategory = await Category.findOne({ name })

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists',
      })
    }

    // 4️⃣ Create category
    const category = await Category.create({
      name,
      description,
    })

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    })
  } catch (error) {
    console.error(error)

    // Handle Mongo duplicate error fallback
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists',
      })
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}