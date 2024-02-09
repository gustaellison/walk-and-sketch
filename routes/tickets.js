const express = require('express')
const router = express.Router()
const middleware = require('../middleware')

const ticketsCtrl = require('../controllers/tickets')
const { Tour, Users } = require('../models')
const Ticket = require('../models/Ticket')


//INDEX ROUTE
router.get("/", function (req, res, next) {
    const { date, tour, user } = req.body
    let conditions = {}

    if (date) {
        conditions.date = date
    }
    if (tour) {
        conditions._tour = tour
    }
    if (user) {
        conditions._users = user
    }

    Ticket.find(conditions)
        .populate('_tour _users')
        .then(tickets => {
            res.json(tickets)
        })
})

// CREATE ROUTE
router.post('/', function (req, res, next) {
    const { date, _tour, _users } = req.body
    Ticket.findOneAndUpdate({
        date: date,
        _tour: _tour
    },
        { $push: { _users: _users } },
        { upsert: true, new: true })
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