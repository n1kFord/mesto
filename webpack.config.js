const path = require('path');
const HtmlWebpackPack = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    
    devServer: {
        compress: true,
        hot: true,
    },

    performance: {
        hints: false, /* ругается на большой вес шрифтов */
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader', 
                exclude: /node-modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            
        ],
    },
    plugins: [
        new HtmlWebpackPack({
            template: './src/index.html',
        }),

        new MiniCssExtractPlugin(),
    ],
}