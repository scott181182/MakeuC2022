import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import { client as apolloClient } from "../lib/apollo";

function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps}/>
        </ApolloProvider>
    );
}

export default App;
