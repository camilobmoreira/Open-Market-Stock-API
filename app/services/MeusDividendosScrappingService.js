'use strict';

const cheerio = require('cheerio')

const RequestUtils = require('../utils/RequestUtils')
const StockInfo = require('../models/StockInfo')
const Earning = require('../models/Earning')

const BASE_URL = 'https://portal.meusdividendos.com/'
const URL =  BASE_URL + 'v1/acervo/ativo?q=${symbol}'

exports.get = async function(symbol) {
    let url = URL.replace('${symbol}', symbol)
    let finalUrl = await searchFinalUrl(url, symbol)
    if (!finalUrl) {
        return null
    }
    let stockInfo = scrap(finalUrl, symbol)
    return stockInfo
}

async function scrap(url, symbol) {
    let html = await RequestUtils.syncGet(url)
    let $ = cheerio.load(html)
    let ticker = $('.profile-username')[0].children[0].data
    if (ticker.toUpperCase() !== symbol.toUpperCase()) {
        return null
    }
    let stockInfo = new StockInfo()
    stockInfo.symbol = ticker
    let basicInfoDiv = $('#perfil')
    let priceInfo = basicInfoDiv.find('b')[0].children[0].data //fixme there's probably a better way of doing this
    if (priceInfo.includes('$')) {
        stockInfo.price = priceInfo.split(' ')[1]
    }
    let divEarnings = $('#box-proventos').find('.box-body')
    stockInfo.earningsHistory = scrapEarningsHistory(divEarnings)

    return stockInfo
}

function scrapEarningsHistory(divEarnings) {
    let earningsHistory = []
    // let earningsTable = divEarnings.find('tbody')
    // let rows = earningsTable.find('tr')
    // let size = rows.length
    
    // for(let i = 0; i < size; i++) {
    //     let row = cheerio.load(rows[i])('tr')
    //     let tds = row.find('td')
    //     let earning = new Earning()
    //     earning.type = tds[0].innerText
    //     earning.announcedDate = tds[1].innerText //fixme format date
    //     earning.paidDate = tds[2].innerText //fixme format date
    //     earning.value = tds[3].innerText
    //     earning.yield = tds[4].innerText //fixme remove %?
    //     earningsHistory.push(earning)
    // }
    
    return earningsHistory
}

async function searchFinalUrl(url, symbol) {
    let response = JSON.parse(await RequestUtils.syncGet(url))
    if (!response) {
        return null
    }
    let {a: acao, e: empresa, f: fundo, i: imobiliario} = response
    let finalUrl = searchUrl(acao, symbol)
    if (finalUrl) {
        return finalUrl
    }
    finalUrl = searchUrl(imobiliario, symbol)
    if (finalUrl) {
        return finalUrl
    }
    finalUrl = searchUrl(empresa, symbol)
    if (finalUrl) {
        return finalUrl
    }
    finalUrl = searchUrl(fundo, symbol)
    if (finalUrl) {
        return finalUrl
    }
    return null
}

function searchUrl(optionsArray, symbol) {
    if (!optionsArray || !optionsArray.length) {
        return null
    }
    let upperCaseSymbol = symbol.toUpperCase()
    let found = optionsArray.find(searchTicker(upperCaseSymbol))
    if (found && found.u) {
        return found.u
    }
    return null
}

function searchTicker(symbol) {
    return ticker => ticker.i == symbol
}