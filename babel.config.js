module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@ui-library': './ui-library',
        },
      },
    ],
  ],
};
