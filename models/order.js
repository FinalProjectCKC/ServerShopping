const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderDetail = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    require: true
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
  reasonCancel: {
    type: String,
    default: null
  },
  quan: {
    type: String,
    require: true
  },
  price: {
    type: String,
    require: true
  },
  created_at: {
    type: Date,
    require: true
  },
  delete_at: {
    type: Date,
    default: null,
    timezone: "Asia/Ho_Chi_Minh",
  },
  last_modified: {
    type: Date,
    default: Date.now
  },
})

const orderSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    // default: new ObjectId()
  },
  orderDetail: [orderDetail],
  total: {
    type: String,
  },
  cusID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  cusName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    timezone: "Asia/Ho_Chi_Minh"
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0
  },
  delete_at: {
    type: Date,
    default: null,
    timezone: "Asia/Ho_Chi_Minh"
  },
  last_modified: {
    type: Date,
    default: Date.now,
    timezone: "Asia/Ho_Chi_Minh"
  }
})

const Order = mongoose.model('Order', orderSchema, 'Order')

module.exports = Order