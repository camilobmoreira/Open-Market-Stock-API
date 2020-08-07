'use strict';

const cheerio = require('cheerio')

const RequestUtils = require('../utils/RequestUtils')
const StockInfo = require('../models/StockInfo')
const Earning = require('../models/Earning')

//https://query1.finance.yahoo.com/v7/finance/quote?symbols=xplg11.sa&fields=regularMarketPrice // xplg11
//https://query1.finance.yahoo.com/v7/finance/quote?symbols=itsa4.sa&fields=regularMarketPrice  // itsa4
//https://query1.finance.yahoo.com/v7/finance/quote?symbols=bidi11.sa&fields=regularMarketPrice // bidi11
//https://query1.finance.yahoo.com/v7/finance/quote?symbols=aapl&fields=regularMarketPrice      //aapl
//https://query1.finance.yahoo.com/v7/finance/quote?symbols=BTC-USD&fields=regularMarketPrice   //btc-usd
//https://query1.finance.yahoo.com/v7/finance/quote?symbols=XMR-USD&fields=regularMarketPrice   //xmr-usd

const BASE_URL = 'https://query1.finance.yahoo.com/'
const URL =  BASE_URL + 'v7/finance/quote?symbols=${symbol}&fields=regularMarketPrice'


exports.get = async function(symbol) {
    let url = URL.replace('${symbol}', symbol) //fixme find a way to check if symbol is valid, ex: bidi4 should be bidi4.sa
    let stockInfo = await scrap(url, symbol)
    return stockInfo
}

async function scrap(url, symbol) {
    let json = JSON.parse(await RequestUtils.syncGet(url))
    if (json.quoteResponse.error || !json.quoteResponse.result.length) {
        return null
    }
    json = json.quoteResponse.result[0]
    if (json.symbol.toUpperCase() !== symbol.toUpperCase()) {
        return null
    }
    let stockInfo = new StockInfo()
    stockInfo.symbol = json.symbol
    stockInfo.market = json.market
    stockInfo.type = json.quoteType
    stockInfo.price = json.regularMarketPrice

    return stockInfo
}