const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FractalWebpackPlugin = require('fractal-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const config = require('./config');

const inProduction = process.env.NODE_ENV === 'production';
const styleHash = inProduction ? '.[contenthash]' : '';
const scriptHash = inProduction ? '.[chunkhash]' : '';

const extractCss = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: `${config.assetsPath}static/css/`
    }
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 1,
        sourceMap: true
    }
};

const images = [
    {
        loader: 'file-loader',
        options: {
            name: '[folder]/[name].[ext]',
            outputPath: 'images/',
            publicPath: `${config.assetsPath}static/images/`
        }
    }
];

if (inProduction) {
    images.push('image-webpack-loader');
}

module.exports = {
    entry: {
        'design-system': './fractal/HC-theme/scss/theme.scss',
        styles: './resources/assets/styles/main.scss',

        scripts: './resources/assets/js/main.js',
        theme: './fractal/HC-theme/js/theme.js'
    },
    output: {
        path: path.resolve(__dirname, '../static/'),
        filename: `js/[name]${scriptHash}.js`
    },
    watchOptions: {
        ignored: /node_modules/
    },

    devtool: false,

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                /**
                 * Load SASS files with 2 loaders
                 *      PostCSS: This converts the SCSS to CSS, adds in polyfills for flexbox,
                 *               auto prefixes and adds in normalise CSS.
                 *      SASS Loader: This generates source maps for CSS.
                 */
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                // publicPath is the relative path of the resource to the context
                                // e.g. for ./css/admin/main.css the publicPath will be ../../
                                // while for ./css/main.css the publicPath will be ../
                                return (
                                    path.relative(
                                        path.dirname(resourcePath),
                                        context
                                    ) + '/../'
                                );
                            }
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('postcss-preset-env')({
                                    autoprefixer: {
                                        flexbox: 'no-2009'
                                    },
                                    stage: 3
                                }),
                                require('autoprefixer')(),
                                require('cssnano')({
                                    preset: [
                                        'default',
                                        {
                                            normalizeWhitespace: false,
                                            discardComments: {
                                                removeAll: true
                                            }
                                        }
                                    ]
                                })
                            ],
                            sourceMap: true,
                            minimize: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                sourceComments: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [extractCss, cssLoader, 'postcss-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: images
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: `${config.assetsPath}static/fonts/`
                }
            }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                }
            }
        }
    },

    resolve: {
        alias: {
            '@@': path.resolve(__dirname, '../'),
            '@': path.resolve(__dirname, '../resources/assets/js'),
            images: path.join(__dirname, '../resources/assets/images')
        },
        extensions: ['*', '.js', '.json']
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['!images/**/*', '!fonts/**/*']
        }),

        new FixStyleOnlyEntriesPlugin({ extensions: ['less', 'scss', 'css'] }),

        new MiniCssExtractPlugin({
            filename: `css/[name]${styleHash}.css`
        }),

        new ManifestPlugin(),

        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3333,
                proxy: config.devUrl, // YOUR DEV-SERVER URL
                // files: ['./resources/views/**/*.twig', './static/css/*.*', './static/js/*.*'],
                files: ['./static/css/*.*']
            },
            {
                reload: true,
                injectCss: true
            }
        ),
        /**
         * Copies images over to the output directory
         */
        new CopyWebpackPlugin([
            {
                from: './resources/assets/images/',
                to: 'images'
            }
        ]),

        /**
         * Runs Fractal in either server mode for dev and build mode for
         * production.
         */
        new FractalWebpackPlugin({
            mode: inProduction ? 'build' : 'server',
            sync: inProduction ? false : true
        })
    ]
};

if (!inProduction) {
    module.exports.plugins.push(new webpack.SourceMapDevToolPlugin({}));
}
