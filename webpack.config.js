const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
module.exports = {
  //Source to transforms
  entry: ["./src/js/App.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  devServer: {
    contentBase: "./dist",
    port: 8888
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: ['@babel/preset-env'],
            plugins: ['transform-class-properties']
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};