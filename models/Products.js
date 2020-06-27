const mongoose = require('mongoose')
const Schema = mongoose.Schema

  const productSchema = new Schema({
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      // default: new ObjectId()
    },
    productName: {
      type: String,
      require: true
    },
    typeProduct: {
      type: String,
      require: true
    },
    unit: {
      type: String,
      require: true
    },
    quan: {
      type: String,
    },
    price: {
      type: String,
    },
    created_at: {
      type: Date,
      timezone: "Asia/Ho_Chi_Minh"
    },
    delete_at: {
      type: Date,
      timezone: "Asia/Ho_Chi_Minh"
    },
    last_modified: {
      type: Date,
      default: Date.now,
      timezone: "Asia/Ho_Chi_Minh"
    }
  })
  
  const Product = mongoose.model('Product', productSchema, 'Product')
  
  module.exports = Product