import Head from 'next/head';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Cielo Maria Reads Blog</title>
                <link rel="icon" href="/images/favicon.ico" />
            </Head>
            {children}
        </>
    );
}