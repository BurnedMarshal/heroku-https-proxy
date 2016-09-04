'use strict'

let redbird = require('redbird')

var proxy = redbird({
  port: process.env.PORT || 3000
})

proxy.register(process.env.LISTEN_DOMAIN || 'http://localhost:3000', process.env.TARGET_DOMAIN || 'http://www.google.com')

module.exports = proxy;
