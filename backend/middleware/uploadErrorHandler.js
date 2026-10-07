import multer from 'multer'

export const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Image size must be less than 5 MB',
      })
    }

    return res.status(400).json({
      message: err.message,
    })
  }

  if (err) {
    return res.status(400).json({
      message: err.message,
    })
  }

  next()
}
