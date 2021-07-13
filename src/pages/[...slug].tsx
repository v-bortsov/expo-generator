import React from 'react';
import { Provider } from 'react-redux'
import { store } from '../store';
import TabOneScreen from '../screens/TabOneScreen'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import App from '../../App';
import { props, type } from 'ramda';
import { system, color } from 'styled-system';
import Head from 'next/head'

export default ()=> {
// usePreviewRedirect()

  const router = useRouter()
  console.log(router);

  // if (!router.isFallback && !page) {
  //   return <ErrorPage statusCode={404} />
  // }

  return (<>
    <Head>
      <title>You Fake Do It - smart data generation {router.asPath}</title>
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
  </>)
}

// export async function getStaticProps({ params, preview = false }) {
//   // const props = await getAgilityPageProps({ params, preview })

//   if (!props) {
//     return { props: {} }
//   }

//   return {
//     props: {
//       sitemapNode: props.sitemapNode,
//       page: props.page,
//       pageTemplateName: props.pageTemplateName,
//       languageCode: props.languageCode,
//       channelName: props.channelName,
//       preview,
//     },
//   }
// }

// export async function getStaticPaths() {
//   const paths = await getAgilityPaths()
//   return {
//     paths: paths,
//     fallback: true,
//   }
// }