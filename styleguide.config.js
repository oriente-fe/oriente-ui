const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  title: 'Style Guide',
  components: 'packages/[A-Z]*/index.vue',
  usageMode: 'expand',
  exampleMode: 'expand',
  webpackConfig: {
    devServer: {
      hot: false,
      inline: true
    },
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '~': path.resolve(__dirname),
        '@': path.resolve(__dirname, 'packages')
      }
    },
    module: {
      rules: [
        // Vue loader
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Other loaders that are needed for your components
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'url-loader',
          query: {
            limit: 1000, // 1KB
            name: '[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(css?|scss)(\?.*)?$/,
          loaders: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      // add vue-loader plugin
      new VueLoaderPlugin()
    ]
  }
}
