const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

//javascript module to use es2015
const javascript = {
  test: /\.(js)$/, 
  use: [{
    loader: 'babel-loader',
    options: { presets: ['es2015'] } 
  }],
};

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

const styles = {
  test:  /\.scss$/,
  use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
};


const fonts = {
  test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts/', // where the fonts will go
      publicPath: '../' // override the default path
    }
  }]
};

const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
  compress: { warnings: false }
});

const config = {
  entry: {
    App: './public/js/farm-fare.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    //picks up the name above from entry
    filename: '[name].bundle.js'
  },

  
  module: {
    rules: [javascript, fonts, styles]
  },

  // plugins: [uglify]
  plugins: [
    new ExtractTextPlugin('style.css') //output based on cinfig path
  ]
};

// hide deprication warnings
process.noDeprecation = true;

module.exports = config;
