// // @generated: @expo/next-adapter@2.1.82
import React from 'react';
import { Provider } from 'react-redux'
import { store } from '../store';
import TabOneScreen from '../screens/TabOneScreen'
import Head from 'next/head'
import App from '../../App';
// import Page from './[...slug]';

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import { from } from "@apollo/client";
// import TabTwoScreen from "../screens/TabTwoScreen";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to Expo + sfgNext.js 👋</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//   },
// });
// export default Page;
export default () => <>
  <Head>
    <title>You Fake Do It - smart data generation system</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    <link rel="manifest" href="/site.webmanifest"/>
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
    <meta name="msapplication-TileColor" content="#da532c"/>
    <meta name="theme-color" content="#ffffff"/>
  </Head>
  <App/>
  {/* <Provider store={ store }><TabOneScreen/></Provider> */}
</>
