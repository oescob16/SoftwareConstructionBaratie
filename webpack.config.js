const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    signUp: './src/signUp.js',
    login: ['./src/loginFunctions.js', './src/auth.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  watch: true
}

