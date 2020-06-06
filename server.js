'use strict'

// Constants
const APP_NAME = 'Open Stock Market API'
const PORT = process.env.PORT || 3000
const SWAGGER_URL = '/api-docs'
const SWAGGER_FILE = '/api-docs.json'

const express = require('express')
const app = express()
const expressSwagger = require('express-swagger-generator')(app)

const options = {
    swaggerDefinition: {
        info: {
            description: `An Open Source API for getting info from the stock market.`, //fixme add github page?
            title: APP_NAME,
            version: '1.0.0',
        },
        host: `localhost:${PORT}`,
        basePath: '/',
        produces: [
            "application/json",
            // "application/xml"
        ],
        schemes: ['http', 'https'],
		// securityDefinitions: {
        //     JWT: {
        //         type: 'apiKey',
        //         in: 'header',
        //         name: 'Authorization',
        //         description: "",
        //     }
        // }
    },
    route : {
        url : SWAGGER_URL,
        docs : SWAGGER_FILE
    },
    basedir: __dirname, //app absolute path
    files: [
        './app/models/**/*.js',
        './app/routes/**/*.js'
    ] //Path to the API handle folder
}

app.get('/', (req, res) => {
    res.send('Hello world\n')
})

const stockInfoRoutes = require('./app/routes/StockInfoRoutes')
app.use('/', stockInfoRoutes)

expressSwagger(options)

// Error handling. Needs to be the last one
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(PORT)
console.log(`${APP_NAME} is running on http://localhost:${PORT}`)