'use strict';
let stockInfoService = require('../services/StockInfoService');

exports.find_by_symbol = function(req, res) {
	res.json(stockInfoService.findBySymbol(req.params.symbol));
};