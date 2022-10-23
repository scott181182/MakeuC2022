import { Html, NextScript, Main, Head } from "next/document";


export default function Document() {
    return <Html data-theme="blueskies">
        <Head>
            <link rel="icon" type="image/png" href="/favicon.png"></link>
        </Head>
        <body>
            <Main/>
            <NextScript/>
        </body>
    </Html>;
}
