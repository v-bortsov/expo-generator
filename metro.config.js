const { getDefaultConfig } = require("@expo/metro-config");
const defaultConfig = getDefaultConfig(__dirname);
module.exports = (() => {
  // console.log(defaultConfig);
  
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-sass-transformer")
    },
    resolver: {
      sourceExts: [...defaultConfig.resolver.assetExts, "scss", "sass"]
    }
  };
})();