import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "../theme";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../../lib/apolloClient";

function MyApp({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
