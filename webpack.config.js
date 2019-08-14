// webpack v4
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;



module.exports = {
    entry: {
        main: './public/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    target: 'node', // update from 23.12.2018
    externals: [nodeExternals()], // update from 23.12.2018
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
               test: /\.scss$/,
               use: [
                   "style-loader",
                   MiniCssExtractPlugin.loader,
                   "css-loader",
                   "sass-loader"
               ]
            },
             {
                 test: /\.(png|jp(e*)g|svg)$/,
                 use: [{
                     loader: 'url-loader',
                     options: {
                         limit: 8000,
                         name: 'images/[hash]-[name].[ext]',
                         publicPath: 'public/images',
                     }
                 }]
             }
        ]
    },
    plugins: [        
        new CleanWebpackPlugin('dist', {}),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './public/index.html',
            filename: '../index.html'
        }),
        //new WebpackMd5Hash(),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            server: {  }
        }),
        new CopyWebpackPlugin([{
            from: 'public/images',
            to: 'images'
        }]),
        new ImageminPlugin({
            disable: false,
            pngquant: {
                quality: [0.3, 0.5]
            },
        })
    ]
};