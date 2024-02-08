const { User } = require('../models')
const middleware = require('../middleware')
const express = require('express')

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        let matched = await middleware.comparePassword(user.passwordDigest, password)
        if (matched) {
            let payload = { id: user.id, email: user.email, name: user.name, adminStatus: user.adminStatus }
            let token = middleware.createToken(payload)
            return res.send(({ user: payload, token }))
        }
        res.status(401).send({ status: 'Error', msg: 'Unauthorized!' })
    } catch (error) {
        console.log(error)
        res.status(401).send({ status: "Error", msg: "An error has occured!" })
    }
}

const Register = async (req, res) => {
    try {
        const { email, password, name, adminStatus } = req.body
        let passwordDigest = await middleware.hashPassword(password)
        console.log(email)
        let existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send("A user with that email has already been registered!")
        } else {
            // Creates a new user
            const user = await User.create({ name, email, passwordDigest, adminStatus })
            // Sends the user as a response
            res.send(user)
        }
    } catch (error) {
        throw error
    }
}

const CheckSession = async (req, res) => {
    const { payload } = res.locals
    res.send(payload)
}

const UpdatePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword, confirmPassword } = req.body;

        // Ensures the new password and confirmation match
        if (newPassword !== confirmPassword) {
            return res.status(400).send({ status: 'Error', msg: 'New passwords do not match!' });
        }

        const user = await User.findOne({ email });
        console.log(user.passwordDigest, currentPassword)
        // Verifies current password
        const isMatch = await middleware.comparePassword(user.passwordDigest, currentPassword);
        if (!isMatch) {
            return res.status(401).send({ status: 'Error', msg: 'Current password is incorrect!' });
        }

        // Hashes and updates the new password
        const newPasswordDigest = await middleware.hashPassword(newPassword);
        user.passwordDigest = newPasswordDigest;
        await user.save();

        res.send({ status: 'Success', msg: 'Password updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'Error', msg: 'An error occurred while updating the password.' });
    }
};

module.exports = {
    Login,
    Register,
    CheckSession,
    UpdatePassword
}