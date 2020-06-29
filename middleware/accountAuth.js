const Account = require('../models/account')
const handleAccountJwt = require('../handleAccountJwt')

const checkJwt = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken;
      if (req.token === 'admin') {
        return next()
      } else {
        let accountId = handleAccountJwt.getAccountId(req)
        const account = await Account.findOne(
          { _id: accountId }
        )
        if (account === null || account === undefined) {
          return res.json({
            resultCode: -1,
            message: 'Không tìm thấy người dùng này !',
            data: null,
          })
        } else {
          next()
        }
      }
    } else {
      return res.json({
        resultCode: -1,
        message: 'Không tìm thấy người dùng này !',
        data: null,
      })
    }
  } catch (error) {
    res.json(1)
  }
}

module.exports = checkJwt
// exports.adminRole = async (req, res, next) => {
//     let accountId = handleAccountJwt.getAccountId(req)
  
//     try {
//       const account = await Account.findOne({
//         _id: accountId
//       })
  
//       if (account.eduRole !== undefined && account.eduRole === 'admin') {
//         next()
//       } else {
//         return res.json({
//           resultCode: -1,
//           message: 'Bạn không có quyền sử dụng tính năng này !',
//           data: null
//         })
//       }
//     } catch (error) {
//       console.log(error)
//       return res.json({
//         resultCode: -1,
//         message: 'Thất bại',
//         data: null,
//         error: error
//       })
//     }
//   }