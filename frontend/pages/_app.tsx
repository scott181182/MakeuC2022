import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { IconContext } from "react-icons";

import { client as apolloClient } from "../lib/apollo";
import { TopAppBar } from "../components/TopAppBar";
import { AuthProvider } from "../lib/AuthContext";

function App({ Component, pageProps }: AppProps) {


    const fontSettings: IconContext = {
        size: "3rem",
        style: {
            height: "inherit"
        }
    };
    return (
        <AuthProvider>
            <ApolloProvider client={apolloClient}>
                <IconContext.Provider value={fontSettings}>
                    {(pageProps as any).navbar === false ? null : <TopAppBar/>}
                    <Component {...pageProps}/>
                </IconContext.Provider>
            </ApolloProvider>
        </AuthProvider>
    );
}

export default App;
