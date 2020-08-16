const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'key-viewer': [ './src/pages/ts/key-viewer.tsx', './src/pages/scss/key-viewer.scss' ],
        'key-trace-viewer': [ './src/pages/ts/key-trace-viewer.tsx', './src/pages/scss/key-trace-viewer.scss' ],
        'team-score-viewer': [ './src/pages/ts/team-score-viewer.tsx', './src/pages/scss/team-score-viewer.scss' ],
        'setting': [ './src/pages/ts/setting.tsx', './src/pages/scss/setting.scss' ]
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, './src/pages/dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.jsx', '.js', '.scss' ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.node$/,
                loader: 'node-loader'
            },
            {
                test: /\.woff2?$/,
                loader: 'file-loader'
            }
        ]
    },
    target: 'electron-renderer'
};
