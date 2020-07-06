var passport = require('passport')
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

exports.getListProductType = async (req, res) => {
  //let queryParams = req.query
  // let pageSize = Number.parseInt(queryParams.pageSize)
  // let page = Number.parseInt(queryParams.page)
  // let result = []
  try {
    const listProductType = await ProductType.find()
    console.log(listProductType)
    return res.render('product/ProductType',{listProductType});
  } catch (error) {
    return res.send('Có lỗi xảy ra! Thêm loại sản phẩm thất bại');;
  }
}
exports.addProductType = async (req, res) => {
  //Type infor
  try {
    let typeName = req.body.typeName
    let description = req.body.description
    let date = new Date()
    let today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    if (typeName == null && typeName == undefined && typeName == '') {
      return res.send('Tên loại không được để trống');
    }
    const newProductType = new ProductType({
      _id: new mongoose.Types.ObjectId(),
      typeName: typeName,
      description: description,
      created_at: today,
      last_modified: today
    })
    await newProductType.save()
    return res.send('Thêm loại sản phẩm thành công');
  } catch (error) {
    console.log(error)
    return res.send('Có lỗi xảy ra! Thêm loại sản phẩm thất bại');
  }
}
exports.editProductType = async (req, res) => {
  //Type infor
  try {
    let typeName = req.body.typeName
    let description = req.body.description
    await ProductType.findOneAndUpdate(
      { typeName: typeName },
      {
        typeName: typeName,
        description: description,
      }
    )
    return res.send('Cập nhật thành công');
  } catch (error) {
    console.log(error)
    return res.send('Có lỗi xảy ra! Cập nhật thất bại');
  }
}
exports.deleteProductType = async (req, res) => {
  //Type infor
  try {
    let typeName = req.body.typeName
    let description = req.body.description
    let date = new Date()
    let today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    await ProductType.findOneAndUpdate(
      { typeName: typeName },
      {
        delete_at: today,
        last_modified: today,
      }
    )
    return res.send('Xoá thành công');
  } catch (error) {
    console.log(error)
    return res.send('Có lỗi xảy ra! Xoá thất bại');
  }
}