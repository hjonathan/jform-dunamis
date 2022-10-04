module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-transform-arrow-functions',
  ],
};
