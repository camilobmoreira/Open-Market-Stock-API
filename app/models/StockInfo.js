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