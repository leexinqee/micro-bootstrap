const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV == 'production'
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const path = require('path')

module.exports = {
  entry: [path.join(__dirname, '../src/index.js')],
  // devtool:"cheap-module-eval-source-map",
  optimization: {
    splitChunks: {
      chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
  output: {
    // 输出目录
    path: path.join(__dirname, '../build'),
    // publicPatch: '//【cdn】.com',
    // 文件名称
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': path.join(__dirname, '../src'),
      '@layouts': path.join(__dirname, '../src/layouts'),
      '@pages': path.join(__dirname, '../src/pages'),
      '@router': path.join(__dirname, '../src/router'),
      '@components': path.join(__dirname, '../src/components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          devMode ? MiniCssExtractPlugin.loader : 'style-loader',
          // "style-loader", // 创建style标签，并将css添加进去
          // "postcss-loader",
          'css-loader', // 编译css
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        // exclude: /node_modules/,
        loaders: [
          devMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
        // exclude: /node_modules/,
        use: [
          // MiniCssExtractPlugin.loader,
          devMode ? MiniCssExtractPlugin.loader : 'style-loader', // 创建style标签，并将css添加进去
          'css-loader', // 编译css
          'postcss-loader',
          'sass-loader', // 编译scss
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 10 * 1024,
          },
        },
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 最终创建的文件名
      template: path.join(__dirname, '../public/index.html'), // 指定模板路径
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn'],
    }),
  ],
}
