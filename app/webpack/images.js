module.exports = function (paths) {
    'use strict';

    return {
        module: {
            rules: {
                test: /\.(jpe?g|png|svg)$/i,
                // use: "file-loader?name=[name].[ext]&publicPath=assets/foo/&outputPath=app/images/",
                // include: paths,
                use: [
                    'file-loader'
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         // publicPath: './',
                    //         name: 'images/[name]-[hash-8].[ext]',
                    //         // outputPath: 'images/'
                    //     }
                    // }
                ]
            }
        }
    };
};