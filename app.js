'use strict'

let redbird = require('redbird')

var proxy = redbird({
  port: process.env.PORT || 3000
})

// Letsencrypt support
// With redbird you can get zero conf and automatic SSL certificates for your domains
proxy.register(process.env.LISTEN_DOMAIN || 'http://localhost:3000', process.env.TARGET_DOMAIN || 'http://localhost:7473')
