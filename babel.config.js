// @generated: @expo/next-adapter@2.1.82
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = { presets: ['@expo/next-adapter/babel'],
plugins: ["@babel/plugin-proposal-class-properties"],
env: {
  production: {
    plugins: ['react-native-paper/babel'],
  },    
},
// overrides: [
//   {
//     test: './node_modules/@expo/next-adapter/document.js',
//     plugins: [['@babel/plugin-proposal-class-properties']],
//   }, {
//     test: './node_modules/react-native-animatable/*',
//     plugins: [['@babel/plugin-proposal-class-properties']],
//   },
// ], 

};

// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [ ['import', {libraryName: '@ant-design/react-native'}],'react-native-reanimated/plugin'],
//   };
// };