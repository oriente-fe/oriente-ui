const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  title: 'Style Guide',
  components: 'packages/[A-Z]*/index.vue',
  usageMode: 'expand',
  exampleMode: 'expand',
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css'
        }
      ]
    }
  },
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
          test: /\.(png|jpe?g|gif)$/,
          loader: 'url-loader',
          query: {
            limit: 1000, // 1KB
            name: '[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
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
            {
              loader: 'sass-loader',
              options: {
                data: `@import '~/styles/themes/${process.env.THEME ||
                  'ph'}.scss';`
              }
            }
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
