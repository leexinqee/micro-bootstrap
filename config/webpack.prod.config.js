const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cdnBasePath = {
  daily: 'https://dev.g.alicdn.com',
  prod: 'https://g.alicdn.com'
}

let cdn = 'daily'

// BUILD_ARGV_STR webapp应用配置参数  process.env.BUILD_ARGV asset配置参数
if (process.env.BUILD_ARGV_STR) {
  const buildArgv = require('yargs-parser')(process.env.BUILD_ARGV_STR);
  cdn = buildArgv['def_publish_env']
}

const publicPath  = `${cdnBasePath[cdn]}/${process.env.BUILD_GIT_GROUP}/${process.env.BUILD_GIT_PROJECT}/${process.env.BUILD_GIT_BRANCH.split('/')[1]}/build`

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    // 输出目录
    path: path.resolve(__dirname, '../build'),
    // 文件名称
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: publicPath,
    library: `micro-bootstrap-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_micro-bootstrap`
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'all',
          minChunks: 2,
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
        vendors: {
          test: /react/,
          name: 'vendors',
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new OptimizeCSSAssetsPlugin({}),
    new CleanWebpackPlugin(),
  ],
})
