import type { Configuration } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'node:url';
import path from 'path';
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const webpackCommon: Configuration = {
  entry: path.resolve(__dirname, '..', 'src', 'main.tsx'),
  target: 'web',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'js/[name].[chunkhash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: '../tsconfig.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-modules-typescript-loader' }, { loader: 'css-loader', options: { modules: true } }, { loader: 'postcss-loader' }, { loader: 'sass-loader' }],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              svgrConfig: {
                plugins: [
                  {
                    name: 'convertColors',
                    params: {
                      currentColor: true,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|pdf)$/i,
        type: 'asset/resource',
        resourceQuery: /url/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'index.html'),
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '..', 'src', 'assets'),
          to: path.resolve(__dirname, '..', 'dist', 'assets'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, '..', 'public'),
          to: path.resolve(__dirname, '..', 'dist'),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  resolve: {
    plugins: [new TsconfigPathsWebpackPlugin()],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.sass'],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
