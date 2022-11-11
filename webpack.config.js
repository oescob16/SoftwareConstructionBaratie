const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    user: ['./src/user.js'],
    
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  watch: true
}