var Order = require('../models/Order')
let handleAccountJwt = require("../handleAccountJwt");
let api = require("../config");
API_URL = api.API_URL;

function objectIsEmpty(object) {
  if (Object.keys(object).length == 0) {
    return true;
  }
  return false;
}
exports.getListOrder = async (req, res) => {
  try {
    let page = req.body.page;
    let status = parseInt(req.body.status);;
    let limit = parseInt(req.body.limit);
    const listAll = Order.find({});
    let listOrder = await Order.find({
      status: status
    })
      .skip(page * limit)
      .limit(limit);
    const countPage = parseInt((await listAll).length / limit);
    console.log(listOrder)

    return res.json({
      success: true,
      listOrder: listOrder,
      mgs: "Ahihi ",
      countPage: countPage,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      mgs: "Có lỗi xảy ra! Lấy danh sách thất bại",
    });
  }
};
exports.getListOrder1 = async (req, res) => {
  try {
    let page = 0; //req.body.page
    let limit = 2; 
    const listOrder = await Order.find({status: 0})
      .skip(page * limit)
      .limit(limit);
    const listAll = await Order.find({status: 0});
    const countPage = parseInt((await listAll).length / limit);
    return res.render("order/Order", {
      listOrder,
      mgs: "",
      countPage: countPage,
    });
  } catch (error) {
    console.log(error)
    return res.send({ mgs: "Có lỗi xảy ra! Lấy danh sách thất bại" });
  }
};
exports.changeStatus = async (req, res) => {
  try {
    let accountId = handleAccountJwt.getAccountId(req)
    let orderID = req.body.orderID
    let reasonCancel = req.body.reasonCancel
    let status = parseInt(req.body.status)
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
        _id: orderID
      },
      {
        $set: { status: status },
        reasonCancel: reasonCancel,
        last_modified: today
      })
      .then(async (data) => {
        if (data !== null) {
          return res.json({
            success: false,
            mgs: "Huỷ đơn hàng thành công!",
          })
        }
        return res.json({
          success: false,
          mgs: "Có sự cố xảy ra. Không thể huỷ đơn hàng!",
        });
      })
  } catch (error) {
    return res.json({
      success: false,
      mgs: "Có sự cố xảy ra. Không thể huỷ đơn hàng!",
    });
  }
}