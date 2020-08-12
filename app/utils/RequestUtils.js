'use strict';

const request = require('request')

exports.syncGet = function (url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) {
                reject(error)
            }
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>')
            }
            resolve(body)
        });
    }).catch(error => console.log('RequestUtils#syncGet error: ' + error))
}