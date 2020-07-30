var Cart = require('../models/Cart')
var Order = require('../models/Order')
const Account = require('../models/account')
const API_URL = require('../config')
var jwt = require('jsonwebtoken')
let request = require('request-promise')
let base64 = require('base-64')
let mongoose = require('mongoose')
let handleAccountJwt = require('../handleAccountJwt')
const fs = require('fs')
const path = require('path')
let api = require('../config')
const PdfPrinter = require('pdfmake');

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
exports.downloadOrder = async (req, res) => {
  let orderID = req.body.orderID
  let date = new Date()
  try {
    const orderDownload = await Order.findOne({
      '_id': orderID
    })
    convertDay = (date) => {
      if (date === null) {
        return ''
      }
      let day = new Date(date)
      return `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`
    }
    convertTime = (date1) => {
      if (date1 === null) {
        return ''
      }
      let date = new Date(date1)
      let hour = date.getUTCHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if ((seconds < 10)) {
        seconds = '0' + seconds
      }
      return `${hour}:${minutes}:${seconds}`
    }

    let result = []
    let index = 1
    for (const detail of orderDownload.orderDetail) {
      result.push([
        index,
        detail.productName,
        detail.quan,
        detail.price,
      ])
      ++index
    }
    let randomNumber = Math.floor(Math.random() * 10000) + 1
    let name = orderDownload.cusName
    let fileName = `${date}.pdf`

    var fonts = {
      Roboto: {
        normal: path.join(__dirname, '..', 'public/font/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '..', 'public/font/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '..', 'public/font/fontRoboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '..', 'public/font/fontRoboto-MediumItalic.ttf')
      }
    }
    var printer = new PdfPrinter(fonts)

    var docDefinition = {
      content: [
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ['10%', '30%', '30%', '30%'],
            body: [
              [{ text: 'STT', bold: true }, { text: 'Tên SP', bold: true }, { text: 'SL', bold: true }, { text: 'Đơn giá', bold: true }],
            ]
          }
        }
      ]
    }

    for (const product of result) {
      docDefinition.content[0].table.body.push(product)
    }

    var pdfDoc = printer.createPdfKitDocument(docDefinition);

    pdfDoc.pipe(fs.createWriteStream(__dirname.replace('/api', '') + `/public/pdfFile/${fileName}`));
    pdfDoc.end()

    return res.json({
      status: 1,
      message: 'Thành công',
      data: {
        fileUrl: `${API_URL.API_URL}/public/pdfFile/${fileName}`,
        fileName: name
      }
    })
  } catch (error) {
    console.log(error)
    res.json({
      status: -1,
      message: 'Có sự cố xảy ra. Không thể tải xuống thông hoá đơn này !',
      data: null,
    })
  }
}
