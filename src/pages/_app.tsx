import {AppProps} from "next/app";

import Layout from '../app/layout'

import Navigation from "../app/components/Navigation";

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <Layout>
            <Navigation />
            <Component {...pageProps} />
        </Layout>
    )
}
