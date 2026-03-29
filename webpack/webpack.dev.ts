import type { Configuration as Config } from 'webpack';
import type { Configuration as DevServerConfig } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import { webpackCommon } from './webpack.common.ts';

const webpackDev: Config | DevServerConfig = merge(webpackCommon, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
  },
  devServer: {
    port: 3113,
    hot: true,
    historyApiFallback: true,
  },
});

export default webpackDev;
