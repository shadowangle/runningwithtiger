const alias = require('./alias')

const MODULE_RESOLVER = [require.resolve('babel-plugin-module-resolver'), alias]

module.exports = {
  plugins: [MODULE_RESOLVER],
  presets: ['module:metro-react-native-babel-preset'],
}
