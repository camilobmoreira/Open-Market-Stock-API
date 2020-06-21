'use strict';

const cheerio = require('cheerio')

const RequestUtils = require('../utils/RequestUtils')
const StockInfo = require('../models/StockInfo')
const Earning = require('../models/Earning')

const BASE_URL = 'https://www.fundamentus.com.br/'
const URL =  BASE_URL + 'detalhes.php?papel=${symbol}'

exports.get = async function(symbol) {
    let url = URL.replace('${symbol}', symbol)
    let stockInfo = scrap(url, symbol)
    return stockInfo
}

async function scrap(url, symbol) {
    let html = await RequestUtils.syncGet(url)
    let $ = cheerio.load(html)
    let ticker = $('.data.w35').text().trim()
    if (ticker.toUpperCase() !== symbol.toUpperCase()) {
        return null
    }
    let stockInfo = new StockInfo()
    stockInfo.symbol = ticker
    let basicInfoDiv = $('.conteudo.clearfix')
    let priceInfo = basicInfoDiv.find('.data.destaque.w3').text()
    if (priceInfo) {
        stockInfo.price = Number(priceInfo.replace(',', '.'))
    }
    let divdendYield = basicInfoDiv.find('span:contains("Div. Yield")').parent().next().text()
    if (divdendYield.includes('%')) {
        stockInfo.dividendYield = Number(divdendYield.replace(',', '.').replace('%', ''))
    }

    return stockInfo
}