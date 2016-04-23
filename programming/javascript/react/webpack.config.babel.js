import path from 'path';

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    'helloworld': path.join(__dirname, '/src/helloworld.js'),
    'variable': path.join(__dirname, '/src/variable.js'),
    'event': path.join(__dirname, '/src/event.js'),
    'router': path.join(__dirname, '/src/router.js'),
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
        loader: "babel",
        query: {
          presets: [
            "react",
            "es2015"
          ]
        }
      }
    ]
  }
}
