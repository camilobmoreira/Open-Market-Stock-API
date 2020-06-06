'use strict';

const StockInfo = require("../models/StockInfo.js")

const ScrappingServices = [

]

const DividendHistoryServices = [
    
]

exports.findBySymbol = function(symbol) {
    let stockInfo = new StockInfo(symbol, )
	return stockInfo
};