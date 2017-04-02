import path from 'path';

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    'helloworld': path.join(__dirname, '/src/helloworld.js')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [
            "es2015"
          ]
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          "css-loader?importLoaders=1&modules"
        ]
      }
    ]
  },
  externals: {
    'Env': JSON.stringify(require('./.env.json'))
  }
}
