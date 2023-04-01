import '../styles/styles.css'
import type { AppProps } from 'next/app'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { useEffect } from 'react'
import _ from 'lodash'
import { DefaultSeo } from 'next-seo'
import SEO from '../../seo.config'
export const client = new ApolloClient({
  link: createHttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const setVhVariable = () => {
      let vh = window.innerHeight
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    setVhVariable()
    window.addEventListener('resize', _.debounce(setVhVariable, 100))
  })

  return (
    <ApolloProvider client={client}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
