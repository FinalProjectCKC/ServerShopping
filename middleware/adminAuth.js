const Account = require('../models/account')
const handleAccountJwt = require('../handleAccountJwt')

exports.adminAuth = async (req, res, next) => {
  let accountId = handleAccountJwt.getAccountId(req)

  try {
    const account = await Account.findOne({
      _id: accountId
    })

    if (account.eduRole !== undefined && account.eduRole === 'admin') {
      next()
    } else {
      return res.json({
        resultCode: -1,
        message: 'Bạn không có quyền sử dụng tính năng này !',
        data: null
      })
    }
  } catch (error) {
    console.log(error)
    return res.json({
      resultCode: -1,
      message: 'Thất bại',
      data: null,
      error: error
    })
  }


}