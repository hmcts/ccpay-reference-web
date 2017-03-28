// The express-routes middleware expects an array not a hash, values transforms it for us.
module.exports = Object.values(require('require-directory')(module))
