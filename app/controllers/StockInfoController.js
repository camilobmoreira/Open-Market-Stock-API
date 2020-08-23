'use strict';
const StockInfoService = require('../services/StockInfoService')
const jsontoxml = require('jsontoxml')

exports.find_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.json(stockInfo)
}

exports.find_by_symbol_xml = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.set('Content-Type', 'text/xml');
	res.send(jsontoxml({stockInfo}))
}

exports.price_by_symbol = async function(req, res) {
	const stockInfo = await StockInfoService.findBySymbol(req.params.symbol)
	res.json(`${stockInfo.price}`)
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
