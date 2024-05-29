'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { type State, WagmiProvider } from 'wagmi'

import { wagmiConfig } from '../consts/wagmiConfig';

type Props = {
    children: ReactNode,
    initialState: State | undefined,
}

const queryClient = new QueryClient()

export function WagmiContext({ children, initialState }: Props) {
    return (
        <WagmiProvider config={wagmiConfig} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}