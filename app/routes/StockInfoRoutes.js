'use strict';
const router = require('express').Router();
const stockInfoController = require('../controllers/StockInfoController');

/**
 * Find the info of a stock by its symbol
 *
 * @route GET /stockinfo/:symbol
 * @param {string} symbol.path.required - the stock symbol
 * @group Stock Info - Info from Stocks
 * @produces application/json
 * @returns {StockInfo} 200 - The Stock found
 */
router.get('/stockinfo/:symbol', stockInfoController.find_by_symbol);

/**
 * Find the price of a stock by its symbol
 *
 * @route GET /stockinfo/{symbol}/price
 * @param {string} symbol.query.required - the stock symbol
 * @group Stock Info - Info from Stocks
 * @produces number
 * @returns {StockInfo.price} 200 - Price of the Stock found
 */
router.get('/stockinfo/:symbol/price', stockInfoController.price_by_symbol);

/**
 * Find the market of a stock by its symbol
 *
 * @route GET /stockinfo/{symbol}/market
 * @param {string} symbol.query.required - the stock symbol
 * @group Stock Info - Info from Stocks
 * @produces text
 * @returns {StockInfo.market} 200 - Market of the Stock found
 */
router.get('/stockinfo/:symbol/market', stockInfoController.market_by_symbol);

/**
 * Find the currency of a stock by its symbol
 *
 * @route GET /stockinfo/{symbol}/currency
 * @param {string} symbol.query.required - the stock symbol
 * @group Stock Info - Info from Stocks
 * @produces text
 * @returns {StockInfo.currency} 200 - Currency of the Stock found
 */
router.get('/stockinfo/:symbol/currency', stockInfoController.currency_by_symbol);

/**
 * Find the dividend yield of a stock by its symbol
 *
 * @route GET /stockinfo/{symbol}/dividendYield
 * @param {string} symbol.query.required - the stock symbol
 * @group Stock Info - Info from Stocks
 * @produces number
 * @returns {StockInfo.dividendYield} 200 - Dividend yield of the Stock found
 */
router.get('/stockinfo/:symbol/dividendYield', stockInfoController.dividendYield_by_symbol);

/**
 * Find the earnings history of a stock by its symbol
 *
 * @route GET /stockinfo/{symbol}/earningsHistory
 * @param {string} symbol.query.required - the stock symbol
 * @group Stock Info - Info from Stocks
 * @produces array
 * @returns {Array.<Earning>}  200 - Earnings history of the Stock found
 */
router.get('/stockinfo/:symbol/earningsHistory', stockInfoController.earningsHistory_by_symbol);

module.exports = router