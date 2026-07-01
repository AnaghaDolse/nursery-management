import User from '../models/User.js'

export const toggleFavorite = async (req, res) => {
  try {
    const { plantId } = req.params

    const user = await User.findById(req.user.id)

    const isFavorite = user.favorites.some((favorite) =>
      favorite.equals(plantId),
    )

    if (isFavorite) {
      user.favorites = user.favorites.filter(
        (favorite) => !favorite.equals(plantId),
      )
    } else {
      user.favorites.push(plantId)
    }
    await user.save()
    return res.status(200).json({
      message: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      favorites: user.favorites,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites')
    if(!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json({ favorites: user.favorites })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}