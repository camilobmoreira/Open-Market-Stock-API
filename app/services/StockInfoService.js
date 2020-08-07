'use strict';

const StockInfo = require('../models/StockInfo')
const RedisUtils = require('../utils/RedisUtils')

const ScrappingServices = [
    require('./YahooFinanceScrappingService'),
    // require('./FundamentusScrappingService'), 403, why??
    require('./MeusDividendosScrappingService'),
]

const DividendHistoryServices = [
    // require('./MeusDividendosScrappingService'),
]

exports.findBySymbol = async function(symbol) {
    let stockInfo = new StockInfo()
    let cacheKeyStockInfo = `stockInfo.${symbol}`
    let cacheKeyEarningsHistory = `stockInfo.${symbol}.earningsHistory`

    let stockFromCache = await RedisUtils.syncGet(cacheKeyStockInfo)

    tryAndComplete(stockInfo, stockFromCache)
    if (isCompleteNoEarningsHistory(stockInfo)) {
        console.log(`StockInfo for ${symbol} recovered from cache`)
        return stockInfo
    }

    for (let i = 0; i < ScrappingServices.length; i++) {
        const service = ScrappingServices[i];
        let stock = await service.get(symbol)
        tryAndComplete(stockInfo, stock)
        if (isCompleteNoEarningsHistory(stockInfo)) {
            break
        }
    }

    RedisUtils.put(stockInfo, cacheKeyStockInfo, RedisUtils.CONSTANTS.THIRTY_MINUTES)

    if (!isComplete(stockInfo)) {
        stockInfo.earningsHistory = await RedisUtils.syncGet(cacheKeyEarningsHistory)
    }

    if (isComplete(stockInfo)) {
        console.log(`Earnings history for ${symbol} recovered from cache`)
        return stockInfo
    }

    for (let i = 0; i < DividendHistoryServices.length; i++) {
        const service = DividendHistoryServices[i];
        let earningsHistory = await service.get(symbol)
        if (earningsHistory && earningsHistory.length) {
            stockInfo.earningsHistory = earningsHistory
            break
        }
    }

    RedisUtils.put(stockInfo.earningsHistory, cacheKeyEarningsHistory, RedisUtils.CONSTANTS.ONE_WEEK)

	return stockInfo
};

function tryAndComplete(stockInfo, stock) {
    if (!stock || !stock.symbol || (stockInfo.symbol && stockInfo.symbol.toUpperCase() != stock.symbol.toUpperCase())) {
        return
    }
    if (!stockInfo.symbol) {
        stockInfo.symbol = stock.symbol
    }
    if (!stockInfo.market) {
        stockInfo.market = stock.market
    }
    if (!stockInfo.currency) {
        stockInfo.currency = stock.currency
    }
    if (!stockInfo.price) {
        stockInfo.price = stock.price
    }
    if (!stockInfo.dividendYield) {
        stockInfo.dividendYield = stock.dividendYield
    }
    if (!stockInfo.earningsHistory || !stockInfo.earningsHistory.length) {
        stockInfo.earningsHistory = stock.earningsHistory
    }
}

function isCompleteNoEarningsHistory(stock) {
    return stock.symbol 
        // && stock.market
        // && stock.currency
        && stock.price
        // && stock.dividendYield
}

function isComplete(stock) {
    return isCompleteNoEarningsHistory(stock) &&
        stock.earningsHistory
}