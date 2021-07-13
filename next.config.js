// @generated: @expo/next-adapter@2.1.82
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
const withImages = require('next-images');

// module.exports = withExpo(
//   withFonts({
//     projectRoot: __dirname,
//     webpack5: false
//   })
// );
module.exports = withPlugins([withFonts, withImages, [withExpo, { projectRoot: __dirname, webpack5: false }]], {
  /* next.config.js code */
})
// module.exports = withExpo({
//   projectRoot: __dirname,
//   webpack5: false
// });
