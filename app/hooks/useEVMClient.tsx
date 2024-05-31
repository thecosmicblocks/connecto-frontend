"use client";

import { ethers } from 'ethers';
import {
    useAccount,
    useDisconnect
}                 from "wagmi";
import { META_MASK_ERROR_NAMES } from "../consts/metamaskError";
import { opal } from '../consts/wagmiChain';

const handleError = (errorName = '') => {
  if (errorName !== META_MASK_ERROR_NAMES.connectorNotFoundError) {
    // setLoading(false);
    // showMetaMaskError({ errorName });
  } else {
    window?.location?.reload();
  }
};

export const useEVMClient = () => {
    const { disconnect } = useDisconnect({
    });
    const { isConnected, address, } = useAccount();
    console.log(isConnected, address)
    const client = typeof window !== "undefined" && typeof window.ethereum !== 'undefined' ?
      new ethers.providers.Web3Provider(window.ethereum) : null;
    const signer = client?.getSigner();

    const signMessage = async (msg: string): Promise<string | undefined> => {
        if (!isConnected) return;
        try {
          return await window.ethereum.request({
              method: "personal_sign",
              params: [msg, address],
          });
        } catch (error) {
            disconnect()
        }
    }

    const switchChain = async (): Promise<void> => {
        if (!isConnected) return;
        
        try {
            const chainId = '0x' + opal.id.toString(16);
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: chainId,
                        chainName: opal.name,
                        rpcUrls: [opal.rpcUrls.default.http.at(0)], blockExplorerUrls: [opal.blockExplorers?.default.url],
                        nativeCurrency: {
                            symbol: opal.nativeCurrency.symbol,
                            decimals: opal.nativeCurrency.decimals,
                        }
                    }
                ]
            });
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId }],
            });
        } catch (error) {
            disconnect()
        }
    }

    return {
        disconnect,
        isConnected,
        address,
        signer: signer,
        client: client,
        signMessage,
        switchChain,
    }
}