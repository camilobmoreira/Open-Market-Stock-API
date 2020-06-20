'use strict';
const StockInfoService = require('../services/StockInfoService')

exports.find_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.json(stockInfo)
}

exports.price_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.send(stockInfo.price)
}

exports.market_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.send(stockInfo.market)
}

exports.currency_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.send(stockInfo.currency)
}

exports.dividendYield_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.send(stockInfo.dividendYield)
}

exports.earningsHistory_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.send(stockInfo.earningsHistory)
}
