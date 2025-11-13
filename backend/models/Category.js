const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { typpe: String, required: true, unique: true },
  description: String,
})

module.exports = mongoose.model('Category', categorySchema)
