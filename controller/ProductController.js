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

//ProductType
exports.getListProductType = async (req, res) => {
  //let queryParams = req.query
  // let pageSize = Number.parseInt(queryParams.pageSize)
  // let page = Number.parseInt(queryParams.page)
  // let result = []
  try {
    const listProductType = await ProductType.find()
    return res.render('product/ProductType', { listProductType });
  } catch (error) {
    return res.send('Có lỗi xảy ra! Thêm loại sản phẩm thất bại');;
  }
}
exports.addProductType = async (req, res) => {
  //Type infor
  try {
    let typeName = req.body.typeName
    let description = req.body.description
    let typeImg = "img/proType/" + req.file.filename
    let date = new Date()
    let today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    if (typeName == null || typeName == undefined || typeName == '') {
      return res.send('Tên loại không được để trống');
    }
    //create new ProductType
    const newProductType = new ProductType({
      _id: new mongoose.Types.ObjectId(),
      typeName: typeName,
      typeImg: typeImg,
      description: description,
      created_at: today,
      last_modified: today
    })
    await newProductType.save().then(async () => {
      const listProductType = await ProductType.find()
      return res.redirect(req.get('referer'));
      return res.render('product/ProductType', { listProductType });
    })
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
    let typeImg
    let date = new Date()
    let today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))

    if (req.file !== undefined) {
      typeImg = "img/proType/" + req.file.filename
      await ProductType.findOneAndUpdate(
        { typeName: typeName },
        {
          typeName: typeName,
          description: description,
          typeImg: typeImg,
          last_modified: today
        }
      ).then(() => {
        return res.send('Cập nhật thành công');
      })
    } else {
      await ProductType.findOneAndUpdate(
        { typeName: typeName },
        {
          typeName: typeName,
          description: description,
          last_modified: today
        }
      ).then(() => {
        return res.send('Cập nhật thành công');
      })
    }
  } catch (error) {
    console.log(error)
    return res.send('Có lỗi xảy ra! Cập nhật thất bại');
  }
}
exports.deleteProductType = async (req, res) => {
  //Type infor
  try {
    let typeName = req.body.typeName
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
//Product
exports.getListProduct = async (req, res) => {
  try {
    const listProductType = await ProductType.find()
    var listProduct = []
    for (let ProType of listProductType) {
      if (ProType.product !== []) {
        for (let Product of ProType.product) {
          listProduct = listProduct.push(Product);
        }
      }
    }
    return res.render('product/Product', { listProduct, listProductType });
  } catch (error) {
    return res.send('Có lỗi xảy ra! Lấy danh sách sản phẩm thất bại');;
  }
}
exports.addProduct = async (req, res) => {
  //Type infor
  try {
    let typeProduct = req.body.typeProduct
    let description = req.body.description
    let productName = req.body.productName
    let unit = req.body.unit
    let quan = req.body.quan
    let price = req.body.price
    let productImg = "img/product/" + req.file.filename
    let date = new Date()
    let today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))

    if (productName == null || productName == undefined || productName == '') {
      return res.send('Tên sản phẩm không được để trống');
    }
    let proType = await Course.findOne(
      {
        'typeName': typeProduct,
      })
    if (proType == null) {
      return res.send('Không tìm thấy loại sản phẩm này');
    }
    //create new Products
    const newProducts = {
      _id: new mongoose.Types.ObjectId(),
      productName: productName,
      unit: unit,
      quan: quan,
      price: price,
      typeProduct: typeProduct,
      productImg: productImg,
      description: description,
      created_at: today,
      last_modified: today
    }
    proType = await ProductType.findOneAndUpdate(
      { typeName: typeProduct },
      { $push: { product: newProducts } }
    ).then(async (data) => {
      if (data == null) {
        return res.send('Thêm sản phẩm thất bại');
      }
      return res.send('Thêm sản phẩm thành công');
    })
  } catch (error) {
    console.log(error)
    return res.send('Có lỗi xảy ra! Thêm sản phẩm thất bại');
  }
}
exports.editProduct = async (req, res) => {
  //Type infor
  try {
    let typeName = req.body.typeName
    let description = req.body.description
    await Products.findOneAndUpdate(
      { typeName: typeName },
      {
        typeName: typeName,
        description: description,
      }
    ).then(() => {
      return res.send('Cập nhật thành công');
    })
  } catch (error) {
    console.log(error)
    return res.send('Có lỗi xảy ra! Cập nhật thất bại');
  }
}
exports.deleteProduct = async (req, res) => {
  //Type infor
  try {
    let typeName = req.body.typeName
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