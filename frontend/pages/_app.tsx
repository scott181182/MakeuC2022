import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useState } from "react";
import { IconContext } from "react-icons";

import { client as apolloClient } from "../lib/apollo";
import { TopAppBar } from "../components/TopAppBar";
// import { SideNavBar } from "../components/SideNavBar";

function App({ Component, pageProps }: AppProps) {
    // const [ menuOpen, setMenuOpen ] = useState(false);

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
                {/* {(pageProps as any).navbar === false ? null : <TopAppBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>} */}
                {/* <div className="flex">
                    <SideNavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                    <main className="flex-grow">
                        <Component {...pageProps}/>
                    </main>
                </div> */}
                <Component {...pageProps}/>
            </IconContext.Provider>
        </ApolloProvider>
    );
}

export default App;
