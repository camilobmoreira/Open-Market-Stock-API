'use strict';

const StockInfo = require('../models/StockInfo')

const ScrappingServices = [
    require('./GoogleFinanceScrappingService'),
    require('./MeusDividendosScrappingService')
]

const DividendHistoryServices = [
    
]

exports.findBySymbol = async function(symbol) {
    let stockInfo = new StockInfo()
    for (let i = 0; i < ScrappingServices.length; i++) {
        const service = ScrappingServices[i];
        let stock = await service.get(symbol)
        tryAndComplete(stockInfo, stock)
        if (isComplete(stockInfo)) {
            return stockInfo;
        }
    }
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

function isComplete(stock) {
    return stock.symbol && 
        stock.market && 
        stock.currency && 
        stock.price && 
        stock.dividendYield && 
        stock.earningsHistory
}