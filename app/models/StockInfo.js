/**
 * @typedef StockInfo
 * @property {string} symbol.required - Stock symbol
 * @property {string} market.required - Stock market
 * @property {string} currency.required - Currency in which the price is provided
 * @property {number} price.required - Stock price
 * @property {number} dividendYield - Dividend yield
 * @property {Array.<integer>} dividendHistory - Dividend history
 */
module.exports = class StockInfo {
    constructor(symbol, market, currency, price, dividendYield) {
        this.symbol = symbol
        this.market = market
        this.currency = currency
        this.price = price
        this.dividendYield = dividendYield
        this.dividendHistory = []
    }
}