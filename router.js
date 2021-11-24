const Router = require("express")
const controller = require("./controller.js")
const path = require("path")
const middleware = require("./middleware.js")
const router = new Router()




router.get("/", controller.root)

router.post("/login", middleware.filter(), controller.getData)


module.exports = router;