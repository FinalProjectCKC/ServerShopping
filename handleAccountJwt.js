const jwt = require('jsonwebtoken')

exports.getAccountId = (token) => {
    if (req.token === 'admin') {
        return 0;
    }
    return jwt.verify(req.token, 'jwt-secret', (err, data) => {
        if (err) {
            return 0;
        } else {
            return data.id
        }
    })
}

exports.adminRole = (req, res) => {
    if (req.token === 'admin') {
        return true;
    }
    let accountID = getAccountId(req.token)
    let checkAccount = await Account.findOne({
        _id: accountID
    }, () => {
        if (checkAccount.accRole === 'admin') {
            return true;
        }
        return false;
    })
}