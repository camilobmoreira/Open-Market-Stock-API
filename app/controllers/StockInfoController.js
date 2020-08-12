'use strict';
const StockInfoService = require('../services/StockInfoService')

exports.find_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.json(stockInfo)
}

exports.price_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.json(stockInfo.price)
}

exports.market_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.json(stockInfo.market)
}

exports.currency_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.json(stockInfo.currency)
}

exports.dividendYield_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.json(stockInfo.dividendYield)
}

exports.earningsHistory_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.json(stockInfo.earningsHistory)
}
