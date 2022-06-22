const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',"postcss-loader"
                ],
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'image-webpack-loader',
                enforce: 'pre'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    resolve: {
        extensions: [ '.js'],
    },
    devtool: 'inline-source-map',
    devServer: {
        static: path.join(__dirname, ''),
        port: 3110,
        open: true,
        liveReload: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            linkType: 'text/css',
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: path.join(__dirname, 'index.html'),
        }),
    ]
};
