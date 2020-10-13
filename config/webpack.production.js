const path = require('path')
module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'js/[name].min.js'
    },
}