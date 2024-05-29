import { GFooter }             from '@app/components/Footer';
import { Header }              from '@app/components/Header';
import { themes }              from '@app/themes';
import {
    Flowbite,
    ThemeModeScript
}                              from "flowbite-react";
import type { Metadata }       from "next";
// import { EVMWalletModal }      from './components/EVMWalletModal';
import { WalletModal }         from './components/WalletModal';
import { WalletModalProvider } from './context/WalletContext';
import "./globals.css";
import { CommonContextProvider } from './context/CommonContext';
import { ToastProvider }       from "@app/context/ToastContext";
import { ToastContainer }      from "@app/components/Toast";
import { ApolloContext } from './context/ApolloContext';
import { TanstackContext } from './context/TanstackContext';
import { WagmiContext } from './context/WagmiContext';
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { wagmiConfig } from './consts/wagmiConfig';

export const metadata: Metadata = {
    title: "Connecto",
    description: "Connecto",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const initialState = cookieToInitialState(
        wagmiConfig,
        headers().get('cookie')
    )

    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <ThemeModeScript/>
            <title>Connecto</title>
        </head>
        <body className={'w-full p-1 lg:px-9 xl:px-32'}>

        <ToastProvider>
            <WagmiContext initialState={initialState}>
                <TanstackContext>
                    <Flowbite theme={{mode: 'dark', theme: themes}}>
                        <WalletModalProvider>
                            <CommonContextProvider>
                                <ApolloContext>
                                    <WalletModal/>
                                    <Header>
                                    </Header>
                                    <div className={'min-h-[70vh] w-full p-1' }>
                                        {children}
                                    </div>
                                    <GFooter></GFooter>
                                    <ToastContainer></ToastContainer>
                                </ApolloContext>
                            </CommonContextProvider>
                        </WalletModalProvider>
                    </Flowbite>
                </TanstackContext>
            </WagmiContext>
        </ToastProvider>
        {/* <EVMWalletModal/> */}
        </body>
        </html>
    );
}
