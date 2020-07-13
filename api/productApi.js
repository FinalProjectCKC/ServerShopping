var passport = require('passport')
var Account = require('../models/account')
var Product = require('../models/product')
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

exports.addProduct = async (req, res) => {
  let accountId = handleAccountJwt.getAccountId(req)
  let courseName = req.body.courseName
  let trainer = req.body.trainer
  let date = new Date()
  let today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))

  try {
    let createdBy = await Account.findOne({
      _id: accountId
    })

    const newCourse = new Course({
      _id: new mongoose.Types.ObjectId(),
      name: courseName,
      trainer: trainer,
      startedDate: startedDate,
      endedDate: endedDate,
      building_id: buildingId,
      room_id: roomId,
      created_by: createdBy.username,
      created_at: today,
      last_modified: today
    })

    await newCourse.save()

    return res.json({
      resultCode: 1,
      message: 'Tạo khoá học mới thành công !',
      data: {
        course_id: newCourse._id,
        courseName: newCourse.name,
        trainer: newCourse.trainer,
        startedDate: newCourse.startedDate,
        endedDate: newCourse.endedDate,
        buildingName: await getBuildingName(buildingId),
        roomName: await getRoomName(roomId),
        created_by: newCourse.created_by
      }
    })
  } catch (error) {
    console.log(error)
    return res.json({
      resultCode: -1,
      message: 'Có sự cố xảy ra. Tạo khoá học không thành công !',
      data: null,
      error: error
    })
  }
}

exports.getAllProduct = async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  try {
    const listProductType = await ProductType.find()
    if (listProductType !== null) {
      return res.json({
        status: 1,
        message: 'Thành công',
        data: listProductType
      })
    } else {
      return res.json({
        status: -1,
        message: 'Không có loại sản phẩm nào',
        data: null
      })
    }
  } catch (error) {
    console.log(error)
    return res.json({
      status: -1,
      message: 'Có lỗi xảy ra. Không lấy được loại sản phẩm',
      data: null
    })
  }
}
exports.getProductByProType = async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  try {
    const listProductType = await ProductType.find()
    if (listProductType !== null) {
      return res.json({
        status: 1,
        message: 'Thành công',
        data: listProductType
      })
    } else {
      return res.json({
        status: -1,
        message: 'Không có loại sản phẩm nào',
        data: null
      })
    }
  } catch (error) {
    console.log(error)
    return res.json({
      status: -1,
      message: 'Có lỗi xảy ra. Không lấy được loại sản phẩm',
      data: null
    })
  }
}
exports.getProductByName = async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  try {
    const listProductType = await ProductType.find()
    if (listProductType !== null) {
      return res.json({
        status: 1,
        message: 'Thành công',
        data: listProductType
      })
    } else {
      return res.json({
        status: -1,
        message: 'Không có loại sản phẩm nào',
        data: null
      })
    }
  } catch (error) {
    console.log(error)
    return res.json({
      status: -1,
      message: 'Có lỗi xảy ra. Không lấy được loại sản phẩm',
      data: null
    })
  }
}
exports.getProductById = async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  try {
    const listProductType = await ProductType.find()
    if (listProductType !== null) {
      return res.json({
        status: 1,
        message: 'Thành công',
        data: listProductType
      })
    } else {
      return res.json({
        status: -1,
        message: 'Không có loại sản phẩm nào',
        data: null
      })
    }
  } catch (error) {
    console.log(error)
    return res.json({
      status: -1,
      message: 'Có lỗi xảy ra. Không lấy được loại sản phẩm',
      data: null
    })
  }
}
exports.updateProduct = async (req, res) => {

}