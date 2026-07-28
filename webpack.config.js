'use strict';

const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, args) => {
    const isDevelopment = args.mode === 'development';

    const optimization = () => {
        const config = {};

        if (!isDevelopment) {
            config.minimizer = [
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }],
                    },
                }),
                new TerserWebpackPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ];
        }
        return config;
    };

    return {
        mode: isDevelopment ? 'development' : 'production',
        entry: {
            bundle: './src/index.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            filename: '[name].js',
            assetModuleFilename: 'assets/[name][ext][query]',
        },

        devtool: isDevelopment ? 'cheap-module-source-map' : false,
        devServer: {
            port: 8081,
            static: {
                directory: path.join(__dirname),
                watch: false,
            },
            devMiddleware: {
                writeToDisk: true,
            },
            watchFiles: ['./src/**/*', './*.html'],
            hot: true,
            proxy: [
                {
                    context: ['/api'],
                    target: 'http://localhost:3001',
                },
            ],
        },
        watchOptions: {
            ignored: '**/node_modules',
        },
        performance: {
            maxAssetSize: 500000,
            maxEntrypointSize: 500000,
        },

        optimization: optimization(),
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: 'null-loader',
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3.37 }]],
                            plugins: ['@babel/plugin-transform-runtime'],
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: isDevelopment,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: isDevelopment,
                                postcssOptions: {
                                    plugins: [
                                        'tailwindcss',
                                        'autoprefixer',
                                    ],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[name][ext][query]',
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[name][ext][query]',
                    },
                },
            ],
        },
    };
};
