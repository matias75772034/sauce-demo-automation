'use strict'

require('dotenv').config()

module.exports = {
    standard_user: {
        username: process.env.STANDARD_USER,
        password: process.env.PASSWORD
    },
    locked_out_user: {
        username: process.env.LOCKED_USER,
        password: process.env.PASSWORD
    }
}