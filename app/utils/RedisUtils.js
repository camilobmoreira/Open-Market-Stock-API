'use strict';

const redis = require('redis')
const client =  redis.createClient()

const ONE_MINUTE = 60
const THIRTY_MINUTES = ONE_MINUTE * 30
const ONE_HOUR = THIRTY_MINUTES * 2
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7
const DEFAULT_CACHE_EXPIRATION_TIME = THIRTY_MINUTES

exports.CONSTANTS = {
    ONE_MINUTE,
    THIRTY_MINUTES,
    ONE_HOUR,
    ONE_DAY,
    ONE_WEEK,
    DEFAULT_CACHE_EXPIRATION_TIME
}

exports.syncGet = function (cacheKey) {
    return new Promise((resolve, reject) => {
        client.get(cacheKey, (error, response) => {
            if (error) {
                reject(error)
            }
            resolve(response)
        })
    }).catch(error => console.log('RedisUtils#syncGet error: ' + error))
}

exports.put = function (data, cacheKey, expirationTime) {
    if (!cacheKey || !cacheKey.length) {
        throw new Error('Cache key is required')
    }
    let dataAsString = JSON.stringify(data);
    let internalCacheKey = cacheKey.toUpperCase()
    let internalExpirationTime = expirationTime || DEFAULT_CACHE_EXPIRATION_TIME

    client.set(internalCacheKey, dataAsString)
    client.expire(internalCacheKey, internalExpirationTime)
}
