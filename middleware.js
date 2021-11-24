const {check} = require("express-validator")

class middleware {
    filter() {
        return [
            [check('login', 'Username is not be empty').isLength({min:1, max:50})],
            [check('password', 'Password is not be empty').isLength({min:1, max:50})],
        ]
    }

}

module.exports = new middleware()