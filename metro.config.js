const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = withNativeWind(
  (() => {
    const config = getDefaultConfig(__dirname);

    // Configure SVG support
    config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
    config.resolver.sourceExts.push("svg");

    // Ensure transformer is correctly assigned
    config.transformer = {
      ...config.transformer, // Keep existing transformer settings
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    };

    return config;
  })(),
  { input: "./global.css" } // NativeWind config
);
