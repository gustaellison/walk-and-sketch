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
router.post("/", function (req, res, next) {
    const { date, tourId, userIds } = req.body; // Assuming you're sending date, tourId, and userIds in the request body
    const newTicket = new Ticket({
        date: date,
        _tour: tourId,
        _users: userIds
    });

    newTicket.save()
        .then(ticket => {
            res.status(201).json(ticket);
        })
        .catch(err => {
            res.status(400).json({ message: err.message });
        });
});

//Ticket SHOW ROUTE
router.get("/:id", ticketsCtrl.show)

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