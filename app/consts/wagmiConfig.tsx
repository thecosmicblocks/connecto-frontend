"use client";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { configureChains, createConfig } from 'wagmi';
import { opal } from './wagmiChain';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [opal],
  [w3mProvider({ projectId })]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    chains,
  }),
  publicClient,
  webSocketPublicClient,
});
export const ethereumClient = new EthereumClient(wagmiConfig, chains);

/**
 * @dev see https://walletconnect.com/explorer
 */
export const WALLET_CONNECT_WALLET_ID = {
  METAMASK: 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'
}