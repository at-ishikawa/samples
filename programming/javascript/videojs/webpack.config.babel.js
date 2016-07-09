import path from 'path';

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    sample: path.join(__dirname, '/src/sample.js')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: [
            "es2015"
          ]
        }
      }
    ]
  }
//  resolveLoader: {
//    root: __dirname + '/node_modules'
//  }
}
