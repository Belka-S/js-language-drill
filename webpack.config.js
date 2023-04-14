const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const filename = ext => (isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`);
const addBundleAnalyzer = () => !isDev && module.exports.plugins.push(new BundleAnalyzerPlugin());

module.exports = {
  entry: './src/index.js',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    workerChunkLoading: false,
  },

  devtool: isDev ? 'source-map' : false,

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [new CssMinimizerPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'], // 'style-loader',
      },
      { test: /\.hbs$/, use: 'handlebars-loader' },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        use: 'svg-sprite-loader', // <use xlink:href="#logo"></use>
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      scriptLoading: 'module',
      // favicon: 'src/img/favicon.png',
    }),
    new MiniCssExtractPlugin({ filename: filename('css') }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'README.md',
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4040,
    hot: isDev,
    writeToDisk: true,
    clientLogLevel: 'error',
    // open: true,
  },
  // stats: 'errors-only',
  stats: 'minimal',
};

// addBundleAnalyzer();
