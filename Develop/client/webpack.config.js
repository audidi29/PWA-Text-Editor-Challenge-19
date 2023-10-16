const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [

// Generate an HTML file with links to bundled JavaScript files
       new HtmlWebpackPlugin({
        template: './src/index.html', 
        chunks: ['main'], 
      }),

// Generate the Web App Manifest file 
      new WebpackPwaManifest({
        name: 'My PWA',
        short_name: 'MyPWA',
        description: 'A Progressive Web App',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#007bff',
        icons: [
          {
            src: path.resolve('path-to-icon.png'),
            sizes: [96, 128, 192, 256, 384, 512], 
          },
        ],
      }),

      // Generate the service worker file using Workbox
      new InjectManifest({
        swSrc: './src/sw.js', 
        swDest: 'service-worker.js', 
      }),
    ],


    module: {
      rules: [
         // Add a rule for handling JavaScript with Babel
         {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        // Add rules for handling CSS files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
