const express = require('express')
const router = express.Router()
const middleware = require('../middleware')

const toursCtrl = require('../controllers/tours')


//INDEX ROUTE
router.get("/", toursCtrl.index)

// CREATE ROUTE
router.post("/", toursCtrl.create)

//TOUR SHOW ROUTE
router.get("/:id", toursCtrl.show)

router.delete("/:id", toursCtrl.delete)

router.put("/:id", toursCtrl.update)

module.exports = router