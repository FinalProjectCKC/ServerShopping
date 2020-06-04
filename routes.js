const router = require('express').Router()
const verifyToken = require('./middleware/accountAuth')
const accountApi = require('./api/accountApi')
const dashboardApi = require('./api/dashboardApi')
const productApi = require('./api/productApi')
const accountAuth = require('./middleware/accountAuth')


let multer = require('multer')
let upload = multer({ dest: 'uploads' })

// check api 
// router.get('/', (req, res) => {
//   res.json({
//     status: 1,
//     message: 'Have a nice day',
//     data: null
//   })
// })

//Account route
router.route('/register')
  .post(accountApi.register)
router.route('/updateUserData')
  .post(accountApi.updateUserData)
router.route('/getUserData')
  .post(accountApi.getUserData)
router.route('/changeAvatar')
  .post(accountApi.changeAvatar)

router.route('/login')
  .post(accountApi.login)
router.route('/logout')
  .post(accountApi.logout)

router.route('/pushNotificationToken')
  .post(accountApi.pushNotificationToken)
router.route('/getListNotification')
  .post(accountApi.getListNotification)
router.route('/getNumOfNotification')
  .post(accountApi.getNumOfNotification)
router.route('/clearNotification')
  .post(accountApi.clearNotification)

  module.exports = router;