const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';


const styledComponentsTransformer = createStyledComponentsTransformer();
const config = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        {
            "transform": "typescript-plugin-styled-components",
            "type": "config",
            "minify": true,
            "ssr": true
        }

    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: ['/node_modules/'],
                use: 'babel-loader',
                options: {
                    getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
                }
            }

         
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
