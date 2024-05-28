"use client";

import {
    Button,
    List,
    Modal
}                                from "flowbite-react";
import Image                     from "next/image";
import {
    CHAIN_LOGO,
    CHAIN_TYPE
}                                from "../consts/chain";
import { useWalletModalContext } from "../context/WalletContext";
import { EVMWalletList }         from "./EVMConnectWalletList";
import { Center }                from "./Center";
import clsx                      from "clsx";

export const ToggleWalletModalBtn = ({
    className,
}: any) => {
    const walletContext = useWalletModalContext();
    console.log(walletContext);
    console.log(walletContext.userData?.user?.walletAddress);
    const selectedWalletMetadata = walletContext.selectedWalletMetadata;
    const is0x = selectedWalletMetadata?.address?.startsWith("0x");
    return selectedWalletMetadata?.isConnected && walletContext?.userData?.user?.walletAddress ? (
        <Button
            onClick={() => {
                walletContext.setUserData(undefined);
                walletContext.setSelectedWalletChainType(undefined);
                selectedWalletMetadata?.disconnect();
            }}
            className={`${className}`}
            color='gray'
            type="button"
            outline gradientDuoTone="pinkToOrange"
        >
            {
                selectedWalletMetadata?.icon ? (
                    <Image
                        loading="lazy"
                        width={20}
                        height={20}
                        src={selectedWalletMetadata?.icon}
                        alt={walletContext?.selectedWalletChainType || ""}
                        className="mr-1"
                    />
                ) : (
                    <></>
                )
            }
            <Center>
                Disconnect {walletContext.userData.user?.walletAddress?.substring(0, is0x ? 6 : 3)}...
                {walletContext.userData.user?.walletAddress?.substring(walletContext.userData.user?.walletAddress?.length - (is0x ? 4 : 3))}
            </Center>
        </Button>
    ) : (
        <Button
            className={clsx('hover:background-none', className)}
            type="button"
            onClick={() => {
                walletContext.setIsOpen(true);
            }}
            outline
            color={'red'}
        >
            <Center>Connect Wallet</Center>
        </Button>
    )
}

const LeftMenu = ({
                      onClick
                  }: {
    onClick: any
}) => {
    const _onClick = onClick ? onClick : () => {
    };

    return (
        <List unstyled className="flex flex-row md:flex-col justify-evenly items-center gap-3 border-b-2 md:border-b-0 md:border-r-2 pb-4 md:pr-4 overflow-auto">
            {
                Object.values(CHAIN_TYPE).map((chain) => {
                    return (
                        <List.Item
                            key={chain}
                            onClick={() => _onClick(chain)}
                            className="flex cursor-pointer flex-col items-center shadow-2xl transition delay-100 duration-100 ease-in-out hover:-translate-y-1 hover:scale-110"
                        >
                            <div className="h-10">
                                <Image
                                    src={CHAIN_LOGO[chain]}
                                    alt={chain}
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <p className="text-center text-white">{chain}</p>
                        </List.Item>
                    )
                })
            }
        </List>
    )
}

export const WalletModal = () => {
    const walletContext  = useWalletModalContext();
    const MenuWalletList = {
        [CHAIN_TYPE.SOLANA]: () => <></>, // SolanaConnectWalletDialog,
        [CHAIN_TYPE.EVM]: EVMWalletList,
    }
    const RightMenuContent      = MenuWalletList[walletContext.walletChainType];
    
    return (
        <Modal show={walletContext.isOpen} onClose={() => walletContext.setIsOpen(false)}>
            <Modal.Header></Modal.Header>
            <Modal.Body>
                <div className="flex flex-wrap flex-col md:flex-row">
                    {/*<LeftMenu*/}
                    {/*    onClick={(chain: ChainTypeValue) => {*/}
                    {/*        walletContext.setWalletChainType(chain)*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <div className="mt-5 w-full md:mt-0">
                        <RightMenuContent
                            onClose={() => {
                                walletContext.setSelectedWalletChainType(walletContext.walletChainType)
                                walletContext.setIsOpen(false)
                            }}
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
