/**
 * @typedef Earning
 * @property {string} type.required - Type of earning
 * @property {Date} announcedDate.required - Date it was announced
 * @property {Date} paidDate.required - Date it was paid
 * @property {string} value.required - Value that was paid
 * @property {string} eYield - Yield
 */
module.exports = class Earning {
    constructor(type, announcedDate, paidDate, value, eYield) {
        this.type = type
        this.announcedDate = announcedDate
        this.paidDate = paidDate
        this.value = value
        this.eYield = eYield
    }
}