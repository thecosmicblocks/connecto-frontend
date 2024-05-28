"use client";

import {
  EthereumClient,
  w3mProvider,
}                          from '@web3modal/ethereum';
import { createConfig }    from 'wagmi';
import { opal }            from './wagmiChain';
import { configureChains } from "@wagmi/core";
import {
  fallback,
  http,
}                          from "viem";
import { injected } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const { chains } = configureChains(
  [opal],
  [w3mProvider({ projectId })]
);

export const wagmiConfig = createConfig({
  chains: [ opal ],
  connectors: [injected()],
  ssr: true,
  transports: {
    [opal.id]: fallback([ http(opal.rpcUrls.default.http[0]) ]),
  },
});
export const ethereumClient = new EthereumClient(wagmiConfig, chains);

/**
 * @dev see https://walletconnect.com/explorer
 */
export const WALLET_CONNECT_WALLET_ID = {
  METAMASK: 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'
}