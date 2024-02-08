const { User } = require('../models')
const middleware = require('../middleware')
const express = require('express')

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        let matched = await middleware.comparePassword(user.passwordDigest, password)
        if(matched) {
            let payload = {id: user.id, email: user.email}
            let token = middleware.createToken(payload)
            return res.send(({user: payload, token}))
        }
        res.status(401).send({sttaus: 'Error', msg: 'Unauthorized!'})  
    } catch (error) {
        console.log(error)
        res.status(401).send({status: "Error", msg: "An error has occured!"})
    }
}

const Register = async (req, res) => {
    try {
        const { email, password, name } = req.body
        let passwordDigest = await middleware.hashPassword(password)
        console.log(email)
        let existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send("A user with that email has already been registered!")
        } else {
            // Creates a new user
            const user = await User.create({ name, email, passwordDigest })
            // Sends the user as a response
            res.send(user)
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    Login,
    Register
}