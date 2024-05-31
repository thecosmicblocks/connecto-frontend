"use client";

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
}                        from "react";
import {
    CHAIN_TYPE,
    ChainTypeValue
}                        from "../consts/chain";
import { useEVMClient }  from "../hooks/useEVMClient";
import { TODO }          from "../consts/type";
// import base58            from "bs58";
import { connectWallet } from "@app/services/authService";
import {
    getUserInfo,
    saveUserInfo
}                        from "@app/utils/helpers";

type CONNECT_WALLET_STEP = "CHOOSE_A_NETWORK" | "CONNECT_TO_WALLET";
type WalletMetadata = {
    isConnected: boolean,
    address: string,
    disconnect: () => void,
    icon: TODO,
    signMsg: () => Promise<string | undefined>,
    switchChain: () => Promise<void>,
};

type DefaultWalletContext = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    step: CONNECT_WALLET_STEP;
    setStep: (step: CONNECT_WALLET_STEP) => void;
    walletChainType: ChainTypeValue;
    setWalletChainType: (type: ChainTypeValue) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    selectedWalletChainType: ChainTypeValue | undefined;
    setSelectedWalletChainType: (type: ChainTypeValue | undefined) => void;
    walletMetadata: Record<any, WalletMetadata>;
    selectedWalletMetadata: WalletMetadata | undefined;
    userData: TODO;
    setUserData: (userData: TODO) => void;
}

const defaultValue: DefaultWalletContext = {
  isOpen: false,
  setIsOpen: (_isOpen: boolean) => { },
  step: "CHOOSE_A_NETWORK",
  setStep: (_step: CONNECT_WALLET_STEP) => { },
  walletChainType: CHAIN_TYPE.EVM,
  setWalletChainType: (_type: ChainTypeValue) => {},
  isLoggedIn: false,
  setIsLoggedIn: (_isLoggedIn: boolean) => {},
  selectedWalletChainType: CHAIN_TYPE.EVM,
  setSelectedWalletChainType: (_type: ChainTypeValue | undefined) => { },
  walletMetadata: {},
  selectedWalletMetadata: undefined,
  userData: getUserInfo(),
  setUserData: (_userData: TODO) =>  {},
}

const WalletModalContext = createContext(defaultValue)

export const WalletModalProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setGlobalIsOpen] = useState<boolean>(defaultValue.isOpen)
  const setIsOpen = useCallback((_isOpen: boolean) => { setGlobalIsOpen(_isOpen) }, [])

  const [step, setGlobalStep] = useState<CONNECT_WALLET_STEP>(defaultValue.step as CONNECT_WALLET_STEP);
  const setStep = useCallback((_step: CONNECT_WALLET_STEP) => { setGlobalStep(_step)}, [])

  const [walletChainType, setGlobalWalletChainType] = useState<ChainTypeValue>(defaultValue.walletChainType)
  const setWalletChainType = useCallback((_type: ChainTypeValue) => { setGlobalWalletChainType(_type as ChainTypeValue)}, [])

  const [selectedWalletChainType, setGlobalSelectedWalletChainType] = useState<DefaultWalletContext['selectedWalletChainType']>(defaultValue.selectedWalletChainType)
  const setSelectedWalletChainType = useCallback((_type: ChainTypeValue | undefined) => { setGlobalSelectedWalletChainType(_type as ChainTypeValue) }, [])

  const [isLoggedIn, setGlobalIsLoggedIn] = useState<boolean>(defaultValue.isLoggedIn)
  const setIsLoggedIn = useCallback((_isLoggedIn: boolean) => { setGlobalIsLoggedIn(_isLoggedIn) }, [])

    const [userData, setGlobalUserData] = useState<TODO>(defaultValue.userData)
    const setUserData = useCallback((_userData: TODO) => {
        setGlobalUserData(_userData)
        saveUserInfo(_userData)
    }, [])
    const { 
        isConnected: evmIsConnected,
        address: evmAddress,
        disconnect: disconnectEVM,
        signMessage: evmSignMessage,
        switchChain: evmSwitchChain,
    } = useEVMClient();

    const MSG = typeof window === "undefined" ? "" : `
${window.location.host} wants you to sign a message to login
----------------------
See privacy and policy at ${window.location.host}/privacy-policy
    `;
  const walletMetadata: Record<any, WalletMetadata> = useMemo(() => ({
    [CHAIN_TYPE.EVM]: {
        isConnected: evmIsConnected as boolean,
        address: evmAddress as string,
        disconnect: disconnectEVM,
        icon: null,
        signMsg: async () => {
            return evmSignMessage(MSG)
        },
        switchChain: evmSwitchChain
    },
  }), [

        evmIsConnected,
        evmAddress,
        disconnectEVM,
        evmSignMessage,
        MSG,
        evmSwitchChain,
  ])

    const selectedWalletMetadata = useMemo(() => {
        if (selectedWalletChainType) {
            return walletMetadata[selectedWalletChainType];
        }
    }, [walletMetadata, selectedWalletChainType])

    useEffect(() => {
        async function init() {
            const signature = await selectedWalletMetadata?.signMsg();
            console.log(signature);
            const user = await connectWallet({
                walletAddress: selectedWalletMetadata?.address,
                message: MSG,
                signature: signature
            })
            saveUserInfo(user)
            setUserData(user);
        }
        if (
            selectedWalletChainType &&
            selectedWalletMetadata &&
            selectedWalletMetadata.isConnected &&
            !userData
        ) {
            init();
        }
    }, [
        selectedWalletChainType,
        selectedWalletMetadata,
        userData,
        setUserData,
    ])

  return (
    <WalletModalContext.Provider
      value={{
        setIsOpen: setIsOpen,
        isOpen: isOpen,
        step: step,
        setStep: setStep,
        walletChainType: walletChainType as any,
        setWalletChainType: setWalletChainType,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        selectedWalletChainType: selectedWalletChainType as any,
        setSelectedWalletChainType: setSelectedWalletChainType,
        walletMetadata: walletMetadata,
        selectedWalletMetadata: selectedWalletMetadata,
        userData: userData,
        setUserData: setUserData,
      }}
    >
      {children}
    </WalletModalContext.Provider>
  )
}

export const useWalletModalContext = () => {
  const walletModalContext = useContext(WalletModalContext);

  return walletModalContext
} 