const express = require('express')
const { Ticket } = require('../models')

const index = async(req,res,next) => {
    try {
        res.json(await Ticket.find({}).populate('_tour _user'))
    } catch (error) {
        res.status(400).json(error)
    }
}

const create = async(req,res,next) => {
    try {
        res.json(await Ticket.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
}

const show = async(req,res,next) => {
    try {
        res.json(await Ticket.findById(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
}

const update = async(req,res,next) => {
    try {
        res.json(await Ticket.findByIdAndUpdate(req.params.id, req.body, {new:true}))
    } catch (error) {
        res.status(400).json(error)
    }
}

const destroy = async(req,res,next) => {
    try {
        res.json(await Ticket.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    index,
    create,
    show,
    update,
    delete: destroy
}