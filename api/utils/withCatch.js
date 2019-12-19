module.exports = function withCatch(promise) {
    return promise
    .then(data => [null, data])
    .catch(err => [err])
}