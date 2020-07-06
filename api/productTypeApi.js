var Account = require('../models/account')
var ProductType = require('../models/ProductTypes')
var jwt = require('jsonwebtoken')
let request = require('request-promise')
let base64 = require('base-64')
let mongoose = require('mongoose')
let handleAccountJwt = require('../handleAccountJwt')
let fs = require('fs')
const path = require('path')
let api = require('../config')

API_URL = api.API_URL

exports.addProductType = async (req, res) => {
  //let accountId = handleAccountJwt.getAccountId(req)
  //Type infor
  try {
    let typeName = req.body.typeName
    let description = req.body.description
    let date = new Date()
    let today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
      const newProductType = new ProductType({
        _id: new mongoose.Types.ObjectId(),
        typeName: typeName,
        description: description,
        created_at: today,
        last_modified: today
      })
      await newProductType.save()
      return res.json({
        status: 1,
        message: 'Tạo loại sản phẩm mới thành công !',
        data: {
          typeName: newProductType.typeName,
        }
      })
  } catch (error) {
    return res.json({
      status: -1,
      message: 'Có sự cố xảy ra. Tạo loại sản phẩm không thành công !',
      data: null,
      error: error
    })
  }
}
