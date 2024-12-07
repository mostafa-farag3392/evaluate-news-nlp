const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    module: {
        rules: [
                {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
                  },
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({ 
            parallel: true,
          }),
          new CssMinimizerPlugin(), 
        ],
      },
    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/client/views/index.html",
            filename:"./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css", 
          }),
          new WorkboxPlugin.GenerateSW()
    ]   
}


