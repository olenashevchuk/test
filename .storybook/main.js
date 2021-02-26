const cracoWebpack = require('./webpack.config')

module.exports = {
  "stories": 
    ['../src/components/**/*.stories.js'],
  
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "storybook-dark-mode"
  ],
  webpackFinal:(config)=>{
    return { ...config, resolve: { ...config.resolve, alias: {...config.resolve.alias,...cracoWebpack.resolve.alias} } }
  }
}