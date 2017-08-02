module.exports = function () {
    'use strict';

    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: [
                        {
                            loader: 'pug-loader',
                            options: 'pretty'
                        }
                    ]
                }
            ]
        }
    };
}

