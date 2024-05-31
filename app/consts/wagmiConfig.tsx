
import {
  EthereumClient,
  w3mProvider,
}                          from '@web3modal/ethereum';
import { createConfig, cookieStorage, createStorage }    from 'wagmi';
import { opal }            from './wagmiChain';
import { configureChains } from "@wagmi/core";
import {
    createPublicClient,
    http,
}                          from "viem";
import { injected, walletConnect } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const { chains } = configureChains(
  [opal],
  [w3mProvider({ projectId })]
);

export const publicClient = createPublicClient({
    chain: opal,
    transport: http()
})

export const wagmiConfig = createConfig({
  chains: [ opal ],
  connectors: [injected(), walletConnect({ projectId: projectId })],
  ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
  transports: {
    [opal.id]: http(),
  },
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);

/**
 * @dev see https://walletconnect.com/explorer
 */
export const WALLET_CONNECT_WALLET_ID = {
  METAMASK: 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'
}