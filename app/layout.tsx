import { GFooter }             from '@app/components/Footer';
import { Header }              from '@app/components/Header';
import { themes }              from '@app/themes';
import {
    Flowbite,
    ThemeModeScript
}                              from "flowbite-react";
import type { Metadata }       from "next";
import { WagmiConfig }         from 'wagmi';
import { EVMWalletModal }      from './components/EVMWalletModal';
import { WalletModal }         from './components/WalletModal';
import { wagmiConfig }         from './consts/wagmiConfig';
import { SolanaWalletContext } from './context/SolanaWalletContext';
import { WalletModalProvider } from './context/WalletContext';
import "./globals.css";
import { CommonContextProvider } from './context/CommonContext';
import { ToastProvider }       from "@app/context/ToastContext";
import { ToastContainer }      from "@app/components/Toast";

export const metadata: Metadata = {
    title: "Connecto",
    description: "Connecto",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <ThemeModeScript/>
            <title>Connecto</title>
        </head>
        <body className={'w-full p-1 lg:px-9 xl:px-32'}>
        <ToastProvider>
            <WagmiConfig config={wagmiConfig}>
                <SolanaWalletContext>
                    <Flowbite theme={{mode: 'dark', theme: themes}}>
                        <WalletModalProvider>
                            <CommonContextProvider>
                                <WalletModal/>
                                <Header>
                                </Header>
                                <div className={'min-h-[70vh] w-full p-1' }>
                                    {children}
                                </div>
                                <GFooter></GFooter>
                                <ToastContainer></ToastContainer>
                            </CommonContextProvider>
                        </WalletModalProvider>
                    </Flowbite>
                </SolanaWalletContext>
            </WagmiConfig>
        </ToastProvider>
        <EVMWalletModal/>
        </body>
        </html>
    );
}
