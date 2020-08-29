import {ThemeProvider, CSSReset} from "@chakra-ui/core";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

import theme from "../theme";

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
  credentials: "include", // cross-origin 호출이라 할지라도 언제나 user credentials (cookies, basic http auth 등..)을 전송한다
});

function MyApp({Component, pageProps}: any) {
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
