const express = require('express')
const router = express.Router()

const peopleCtrl = require('../controllers/tours')


//INDEX ROUTE
router.get("/", peopleCtrl.index)

// CREATE ROUTE
router.post("/", peopleCtrl.create)

//TOUR SHOW ROUTE
router.get("/:id", peopleCtrl.show)

router.delete("/:id", peopleCtrl.delete)

router.put("/:id", peopleCtrl.update)

module.exports = router