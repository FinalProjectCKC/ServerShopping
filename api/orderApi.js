var Cart = require('../models/Cart')
var Order = require('../models/Order')
const Account = require('../models/account')
var jwt = require('jsonwebtoken')
let request = require('request-promise')
let base64 = require('base-64')
let mongoose = require('mongoose')
let handleAccountJwt = require('../handleAccountJwt')
let fs = require('fs')
const path = require('path')
let api = require('../config')

exports.newOrder = async (req, res) => {
  try {
    //get data when create new order
    let accountId = handleAccountJwt.getAccountId(req)
    let date = new Date()
    let { address, phone } = req.body
    let today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    if (accountId == null) {
      return res.json({
        status: -1,
        message: 'Không tìm thấy người dùng này!',
        data: null,
      })
    } else {
      let userCart = await Cart.findOne(
        { userId: accountId }
      )
      let customer = await Account.findOne(
        { _id: accountId }
      )
      if (userCart !== null) {
        const cartDetail = userCart.cartDetail
        const newOrder = new Order({
          _id: new mongoose.Types.ObjectId(),
          orderDetail: cartDetail,
          cusID: accountId,
          address: address,
          phone: phone,
          cusName: (customer.fullName == "" || customer.fullName === null) ? customer.username : customer.fullName,
          total: userCart.total,
          status: 0,
          created_at: today,
          last_modified: today
        })

        await newOrder.save().then(async () => {
          return res.json({
            status: 1,
            message: 'Tạo hoá đơn thành công!',
            data: {
              orderId: newOrder._id
            }
          })
        })
      } else {
        return res.json({
          status: -1,
          message: 'Tạo hoá đơn thất bại!',
          data: null
        })
      }
    }
  } catch (error) {
    console.log(error)
    return res.json({
      status: -1,
      message: 'Có sự cố xảy ra. Không tạo được hoá đơn!',
      data: null,
    })
  }
}
//Xác nhận đã nhận được hàng
exports.Ordered = async (req, res) => {
  try {
    //get data when create new order
    let accountId = handleAccountJwt.getAccountId(req)
    let orderID = req.body.orderID
    let date = new Date()
    let today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))

    if (orderID == null) {
      return res.json({
        status: -1,
        message: 'Không tìm thấy hoá đơn này!',
        data: null,
      })
    }
    if (accountId == null) {
      return res.json({
        status: -1,
        message: 'Không tìm thấy người dùng này!',
        data: null,
      })
    }
    await Order.findOneAndUpdate(
      {
        cusID: accountId,
        _id: orderID
      },
      { $set: { status: 3 } })
      .then(async (data) => {
        if (data !== null) {
          return res.json({
            status: 1,
            message: 'Đã xác nhận thành công',
            data: {
              orderID: orderID
            },
          })
        }
        return res.json({
          status: -1,
          message: 'Xác nhận thất bại',
          data: {
            orderID: orderID
          },
        })
      })
  } catch (error) {
    return res.json({
      status: -1,
      message: 'Có sự cố xảy ra. Không cập nhật được hoá đơn!',
      data: null,
    })
  }
}