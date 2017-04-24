var debug = false;//process.env.NODE_ENV !== "production";
var fs = require('fs');
var webpack = require('webpack');
var _ = require('lodash');

let entries = fs.readdirSync('./src/')
.filter(function(file) {
  return file.match(/.*\.js$/);
});
entries = _.map(entries, (file) => {
  return './src/' + file;
});
module.exports = {
  context: __dirname,
  devtool: "inline-sourcemap",
  entry: entries,
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      }, {
              test: /\.sass$/,
              use: [{
                  loader: "style-loader" // creates style nodes from JS strings
              }, {
                  loader: "css-loader" // translates CSS into CommonJS
              }, {
                  loader: "sass-loader", // compiles Sass to CSS
                  options: {
                    includePaths: ["/scss"],
                    outFile:"./css/main.css"
                  }
              }]
        }
    ]
  },
  output: {
    path: __dirname + "/wwwroot",
    filename: "app.bundle.js"
  },
  plugins: debug ? [] : [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin({ sourcemap: false, compress: true }),
  ],
};
