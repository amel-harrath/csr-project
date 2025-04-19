module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          src: './src',
          controllers: './src/controllers',
          services: './src/services',
          models: './src/models',
          utils: './src/utils',
        },
      },
    ],
  ],
};
