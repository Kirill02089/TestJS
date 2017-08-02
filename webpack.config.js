const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require('path'),
    merge = require('webpack-merge');

const PATH = {
    webpackModules: path.join(__dirname, 'app/webpack'),
    source: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'dist')
};

const pug = require( PATH.webpackModules + '/pug'),
    devserver = require( PATH.webpackModules + '/devserver'),
    sass = require( PATH.webpackModules + '/sass'),
    extractCSS = require( PATH.webpackModules + '/css.extract'),
    uglify = require( PATH.webpackModules + '/js.uglify'),
    images = require( PATH.webpackModules + '/images');

const common = merge([
    {
        entry: {
            'index': PATH.source + '/js/index.js'
        },
        output: {
            path: PATH.build,
            filename: 'js/[name].js'
        },
        module: {
            rules:[
                {
                    test: /\.(jpg|png)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'img/',
                                publicPath: 'img/'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: PATH.source + '/pug/index.pug',
                chunks: ['index', 'common']
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ]
    },
    pug()
]);

module.exports = function (env) {
    'use strict';
    if (env === 'production') {
        console.log('PRODUCTION MODE');
        return merge([
            common,
            extractCSS(),
            uglify()
        ]);
    }
    if (env === 'development') {
        console.log('DEVOLOPMENT MODE');
        return merge([
                common,
                sass(),
         //       images(),
                 devserver()
            ]
        );
    }
};


