module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin', ['import', {libraryName: '@ant-design/react-native'}]],
  };
};
