const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    menu:'./src/menu.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  watch: true
}