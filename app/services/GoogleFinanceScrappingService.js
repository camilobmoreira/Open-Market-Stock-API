const request = require('request')
const cheerio = require('cheerio')

const BASE_URL = 'https://www.google.com/'
const URL =  BASE_URL + 'search?q=${symbol}&tbm=fin'


exports.get = function(symbol) {
    // let url = URL.replace('${symbol}', symbol)
    // let page = request(url, scrap)
    return null
}

function scrap(error, response, html) {
    if (!error) {
        let newUrl = getNewUrl(html)
        request(newUrl, (error, response, html) => {
            let $ = cheerio.load(html)
            console.log($)
        }) 
        console.log(newUrl)
    }
    console.log(error)
    console.log(response)
    console.log(html)
}

function getNewUrl(html) {
    let $ = cheerio.load(html)
    let newUrl = BASE_URL + $('noscript')[0].children[0].data.split('href=\"\/')[1].split('\">aqui')[0] //fixme make it more readable
    return newUrl
}