'use strict';
let stockInfoService = require('../services/StockInfoService')

exports.find_by_symbol = function(req, res) {
	res.json(stockInfoService.findBySymbol(req.params.symbol))
}

exports.price_by_symbol = function(req, res) {
	res.send(stockInfoService.findBySymbol(req.params.symbol).price)
}

exports.market_by_symbol = function(req, res) {
	res.send(stockInfoService.findBySymbol(req.params.symbol).market)
}

exports.currency_by_symbol = function(req, res) {
	res.send(stockInfoService.findBySymbol(req.params.symbol).currency)
}

exports.dividendYield_by_symbol = function(req, res) {
	res.send(stockInfoService.findBySymbol(req.params.symbol).dividendYield)
}

exports.dividendHistory_by_symbol = function(req, res) {
	res.send(stockInfoService.findBySymbol(req.params.symbol).dividendHistory)
}
