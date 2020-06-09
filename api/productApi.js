var passport = require('passport')
var Account = require('../models/account')
var Product = require('../models/product')
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

exports.getProduct = async (user) => {
  try {
    //let username = user
    let fullName = ''
    let email = ''
    let phone = ''
    const account = await Account.findOne({
      username: user
    })

    if (account.username !== null && account.username !== undefined) {
      username = account.username
    }

    if (account.fullName !== null && account.fullName !== undefined) {
      fullName = account.fullName
    }
    if (account.email !== null && account.email !== undefined) {
      email = account.email
    }

    if (account.phone !== null && account.phone !== undefined) {
      phone = account.phone
    }

    return {
      username: username,
      fullName: fullName,
      email: email,
      phone: phone
    }
  } catch (error) {
    return ''
  }
}

exports.updateProduct = async (req, res) => {
  // const newAccount = new Account({
  //   _id: new mongoose.Types.ObjectId(),
  //   userId: id,
  //   username: username,
  //   fullName: (userData1.data === undefined || userData1.data === null) ? null : userData1.data.fullName,
  //   email: (userData1.data === undefined || userData1.data === null) ? null : userData1.data.email,
  //   phone: (userData1.data === undefined || userData1.data === null) ? null : userData1.data.phone,
  //   status: 1,
  //   created_at: new Date()
  // })
  // result = await newAccount.save()
}