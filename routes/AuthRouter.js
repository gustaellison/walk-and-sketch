const express = require('express')
const router = express.Router()
const controller = require('../controllers/AuthController')




router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.get(
    '/session',
    middleware.stripToken,
    middleware.verifyToken,
    controller.CheckSession
  )

module.exports = router