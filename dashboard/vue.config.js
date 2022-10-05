const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
    },
  },
  chainWebpack: (config) => {
    // remove typecheck
    config.plugins.delete('fork-ts-checker');

    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ['json'],
      },
    ]);

    config.performance.maxEntrypointSize(40000000).maxAssetSize(40000000);

    config.plugins.delete('prefetch');

    return config;
  },
  devServer: {
    watchOptions: {
      ignored: ['node_modules'],
      poll: true,
    },
  },
  transpileDependencies: [],
  filenameHashing: false,
  productionSourceMap: false,
  css: { sourceMap: false },
};
