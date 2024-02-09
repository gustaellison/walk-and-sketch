const express = require('express')
const router = express.Router()
const middleware = require('../middleware')

const ticketsCtrl = require('../controllers/tickets')
const { Tour, Users } = require('../models')
const Ticket = require('../models/Ticket')


//INDEX ROUTE
router.get("/", function (req, res, next) {
    const { tour, user } = req.body
    let conditions = {}

    if (tour) {
        conditions._tour = tour
    }
    if (user) {
        conditions._users = user
    }

    Ticket.find(conditions)
        .populate('_tour _user')
        .then(tickets => {
            res.json(tickets)
        })
})

// CREATE ROUTE
router.post('/', function (req, res, next) {
    const { _tour, _user } = req.body
    Ticket.create({
        _tour: _tour,
        _user: _user
    },)
        .then(tour => {
            res.json(tour);
        })
        .catch(err => {
            res.json({ message: err.message })
        });
});

//Ticket SHOW ROUTE
router.get('/:id', function (req, res, next) {
    const { id } = req.params;
    Ticket.findById(id)
        .then(ticket => {
            res.json(ticket);
        });
});

router.delete("/:id",
    middleware.stripToken,
    middleware.verifyToken,
    ticketsCtrl.delete
)

router.put("/:id",
    middleware.stripToken,
    middleware.verifyToken,
    ticketsCtrl.update
)

module.exports = router