const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'IntActNetworkViewer': path.resolve('src/index.ts'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          // css-loader
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.svg', 'jpg'],
  },
  output: {
    filename: 'intact-network-viewer.js',
    library: 'IntActNetworkViewer',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build'),
  }
};