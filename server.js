'use strict'

// Constants
const APP_NAME = 'Open Stock Market API'
const PORT = process.env.PORT || 3000
const SWAGGER_URL = '/api-docs'
const SWAGGER_FILE = '/api-docs.json'

const express = require('express')
const app = express()

// Home
app.get('/', (req, res) => {
    let page = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv = "refresh" content = "2; url = /api-docs" />
        </head>
        <body>
            <p>Redirecting to documentation page...</p>
        </body>
    </html>
    `
    res.send(page)
})

// Swagger docs
const swaggerUi = require('express-swaggerize-ui')
app.use('/api-docs.json', function (req, res) {
    res.json(require('./swagger/api-docs.json'))
})
app.use('/api-docs', swaggerUi());

// API routes
const stockInfoRoutes = require('./app/routes/StockInfoRoutes')
app.use('/', stockInfoRoutes)

// Error handling. Needs to be the last one
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(PORT)
console.log(`${APP_NAME} is running on http://localhost:${PORT}`)