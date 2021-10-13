const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.ts',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Protobuf + gRPC demo'
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        static: './dist'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}