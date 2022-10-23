import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";
import { IconContext } from "react-icons";

import { client as apolloClient } from "../lib/apollo";
import { TopAppBar } from "../components/TopAppBar";

function App({ Component, pageProps }: AppProps) {
    const fontSettings: IconContext = {
        size: "3rem",
        style: {
            height: "inherit"
        }
    };
    return (
        <ApolloProvider client={apolloClient}>
            <IconContext.Provider value={fontSettings}>
                {(pageProps as any).navbar === false ? null : <TopAppBar/>}
                <Component {...pageProps}/>
            </IconContext.Provider>
        </ApolloProvider>
    );
}

export default App;
