import webpack from 'webpack';

export default {
  // cache: true,
  // entry: [
  //   'webpack/hot/poll?1000',
  //   './bmfe.js'
  // ],
  entry: {
    bmfe: './core/load.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].js",
  },
  target: 'node',
  context: __dirname + '/src',
  node: {
    __filename: false,
    __dirname: false
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  module: {
    noParse: [/moment-with-locales/],
    rules: [{
      test: /\.(js|es6)$/,
      exclude: '/node_modules/',
      use: [{
        loader: "babel-loader",
        options: { presets: ["es2015"] }
      }],
    },{
      test: /\.json$/,
      use: [{
        loader: 'json-loader'
      }]
    }]
  }
}
