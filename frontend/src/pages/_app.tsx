import {ThemeProvider, CSSReset} from "@chakra-ui/core";
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, ApolloLink, concat} from '@apollo/client';

import theme from "../theme";

function MyApp({Component, pageProps}: any) {
  const cache = new InMemoryCache();
  const link = createHttpLink({
    uri: 'http://localhost:8000/graphql',
    credentials: 'include', // cross-origin 호출이라 할지라도 언제나 user credentials (cookies, basic http auth 등..)을 전송한다
  });
  const client = new ApolloClient({
    link: link,
    cache: cache,
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CSSReset/>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp;
