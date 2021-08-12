import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Home: {
        path: ':lang',
        parse: {
          lang: (lang) => lang,
        },
      },
      NotFound: '*',
    },
  },
  // getStateFromPath(
  //   path, config
  // ) {
  //   console.log(
  //     path,
  //     config
  //   );
  //   // Return a state object here
  //   // You can also reuse the default logic by importing `getStateFromPath` from `@react-navigation/native`
  // },
  // getPathFromState(
  //   state, config
  // ) {
  //   console.log(
  //     state,
  //     config
  //   );
    
  //   // Return a path string here
  //   // You can also reuse the default logic by importing `getPathFromState` from `@react-navigation/native`
  // },
};
