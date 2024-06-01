"use client";

import {
    Button,
    Dropdown,
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
import {
    useEffect,
    useState
}                    from "react";
import { useToast }              from "@app/hooks/useToast.tsx";
import { useRouter } from "next/navigation";

export const ToggleWalletModalBtn = ({
    className,
}: any) => {
    const walletContext = useWalletModalContext();
    const route = useRouter()
    const selectedWalletMetadata = walletContext.selectedWalletMetadata;
    const is0x = selectedWalletMetadata?.address?.startsWith("0x");
    const [ isClient, setIsClient ] = useState(false)
    const toast = useToast();
    useEffect(() => {
        setIsClient(true)
    }, [])
    return selectedWalletMetadata?.isConnected && walletContext?.userData?.user?.walletAddress ? (
            isClient && (<div className={clsx(className, 'flex')}>
            <Dropdown
                label={`${walletContext.userData.user?.walletAddress?.substring(0, is0x ? 6 : 3)}...${walletContext.userData.user?.walletAddress?.substring(walletContext.userData.user?.walletAddress?.length - (is0x ? 4 : 3))}`}
                // onClick={() => {
                //     walletContext.setUserData(undefined);
                //     walletContext.setSelectedWalletChainType(undefined);
                //     selectedWalletMetadata?.disconnect();
                // }}
                outline
                color={'red'}
                theme={
                    {
                        "floating":
                            {
                                "item":
                                    {
                                        "container":
                                            "",
                                        "base":
                                            "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-red-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-red-600 dark:hover:text-white dark:focus:bg-red-600 dark:focus:text-white",
                                        "icon":
                                            "mr-2 h-4 w-4"
                                    }
                                ,
                                "style":
                                    {
                                        "dark":
                                            "bg-gray-900 text-white dark:bg-gray-700",
                                        "light":
                                            "border border-gray-200 bg-white text-gray-900",
                                        "auto":
                                            "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
                                    }
                                ,
                                "target":
                                    "w-fit"
                            }
                        ,
                    }
                }
            >
                <Dropdown.Item href={'/inventory/collection'}>
                    Collection
                </Dropdown.Item>
                <Dropdown.Item href={'/inventory/reward'}>Rewards</Dropdown.Item>
                <Dropdown.Item href={'/profile/'}>Profile</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={() => {
                    navigator.clipboard.writeText(walletContext.userData.user?.walletAddress)
                    toast('success', 'Address copied')
                }}>Copy Address</Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        walletContext.setUserData(undefined);
                        walletContext.setSelectedWalletChainType(undefined);
                        selectedWalletMetadata?.disconnect();
                        walletContext.setIsOpen(true)
                    }}
                >Change Wallet</Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        walletContext.setUserData(undefined);
                        walletContext.setSelectedWalletChainType(undefined);
                        selectedWalletMetadata?.disconnect();
                        walletContext.setIsOpen(false)
                    }}
                >Disconnect</Dropdown.Item>
            </Dropdown>
            </div>)
        ) :
        (
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
        <List unstyled
              className="flex flex-row md:flex-col justify-evenly items-center gap-3 border-b-2 md:border-b-0 md:border-r-2 pb-4 md:pr-4 overflow-auto">
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
    const walletContext = useWalletModalContext();
    const MenuWalletList = {
        [CHAIN_TYPE.EVM]: EVMWalletList,
    }
    const RightMenuContent = MenuWalletList[walletContext.walletChainType];

    return (
        <Modal show={walletContext.isOpen} onClose={() => walletContext.setIsOpen(false)}>
            <Modal.Header></Modal.Header>
            <Modal.Body>
                <div className="flex flex-col flex-wrap md:flex-row">
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
