const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('@admin-bro/express')
const bcrypt = require("bcrypt")

const user = require("./models/user.js")
const score = require("./models/score.js")
const adminUser = require("./models/admin.js")

AdminBro.registerAdapter(require('@admin-bro/mongoose'))

const adminBro = new AdminBro({
    resources: [{
      resource: adminUser,
      options: {
        properties: {
          encryptedPassword: {
            isVisible: true,
          },
          password: {
            type: 'string',
            isVisible: {
              list: false, edit: true, filter: false, show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if(request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                  password: undefined,
                }
              }
              return request
            },
          }
        }
      }
    }, 
    user, 
    score
],
    rootPath: "/admin" || NaN,
  })

const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      const user = await adminUser.findOne({ email })
      if (user) {
        const matched = await bcrypt.compare(password, user.encryptedPassword)
        if (matched) {
          return user
        }
      }
      return false
    },
    cookiePassword: 'DVH6ANPOv7e8JjvEpivm14Qm3DqBLnpd8U9wvN9Q',
  })

module.exports = {adminBro, router}