import React, { useState } from 'react'

import CollectionPack from './CollectionPack'
import {
    confirmExchangeCollection,
    requestExchangeCollection
}                     from '@app/services/inventoryService'
import {
    Accordion,
    Avatar,
    Button,
    Tooltip
}                     from "flowbite-react";
import { useToast }   from "@app/hooks/useToast";

interface CollectionItemProps {
    data: {
        _id: string,
        address: string,
        channel_id: string,
        description: string,
        image: string,
        name: string,
        nft_info: {
            _id: string,
            owned: boolean,
            amount: number,
            description: string,
            image: string,
            name: string,
            order: any,
            symbol: string,
        }[],
        reward_data: {
            description: string,
            image_uri: string,
            name: string,
        },
        reward_history_data: {
            amount: number,
            reward_history_id: string,
        }[],
        symbol: string,
    },
    onFetchCollection?: (address?: string) => void

}

function CollectionItem({data: collectionItem, onFetchCollection}: CollectionItemProps) {
    const [ isOpenModal, setIsOpenModal ] = useState(false)
    const [ isLoadingTransaction, setIsLoadingTransaction ] = useState(false)
    const [ isExpanded, setIsExpanded ] = useState(true)


    const onCloseModal = () => setIsOpenModal(false)
    const onOpenModal = () => setIsOpenModal(true)
    const toggleExpand = () => setIsExpanded(prev => !prev)
    const toast = useToast(4000)

    if (!collectionItem) return <></>
    const nftInfo = Array.isArray(collectionItem.nft_info) ? collectionItem.nft_info : []
    const isExchangeable = nftInfo.every((_nft: { owned: any }) => _nft.owned)

    const onExchange = async (collectionItem: { _id: any; channel_id: any; }) => {
        try {
            setIsLoadingTransaction(true)
            const requestExResp = await requestExchangeCollection({
                "collectionId": collectionItem._id,
                "channelId": collectionItem.channel_id
            })

            const completedTransaction = await Promise.all(
                requestExResp.encodedTxncollectionItem.map((_txData: WithImplicitCoercion<string> | {
                    [Symbol.toPrimitive](hint: "string"): string
                }) => {
                    // return confirmTransactionFromFrontend();
                })
            )

            const {message} = await confirmExchangeCollection({
                "channelId": collectionItem.channel_id,
                "txnSignature": completedTransaction,
                "rewardHistoryId": requestExResp.rewardHistoryId,
            })
            toast('success', 'Exchange successful')
            setIsLoadingTransaction(false)
            onCloseModal()
            onFetchCollection && onFetchCollection()
        } catch (error) {
            console.log(error);
            onCloseModal()
        }
    }

    return (
        <Accordion.Panel key={collectionItem.address}>
            <div className={'flex justify-between'}>
                <Button
                    disabled={!isExchangeable} // || collectionItem.reward_history_data?.length === collectionItem.reward_data?.amount
                    className={'m-3 h-1/2 content-center bg-red-500'}
                    onClick={onOpenModal}
                >Exchange</Button>
                <Accordion.Title className={'flex w-full justify-between'}>
                    <div className={'flex gap-3'}>
                        <h3 className={'text-2xl'}>{collectionItem.name}</h3>
                        <h5 className={'text-xl'}>({collectionItem.symbol})</h5>
                    </div>

                </Accordion.Title>
                </div>
            <Accordion.Content>
                <div className={'grid grid-cols-4'}>
                    <div className={'col-span-1 flex flex-row'}>
                        <Avatar
                            img={collectionItem.image}
                            rounded
                            size={'2xl'}
                        ></Avatar>
                        <Tooltip
                            content={`${collectionItem?.reward_data?.name} - ${collectionItem?.reward_data?.description}`}>
                            <Avatar rounded
                                    img={collectionItem?.reward_data?.image_uri || ""}
                                    size={'lg'}
                                    className={''}
                            />
                        </Tooltip>
                    </div>
                    <div className={'col-span-3 flex flex-row'}>
                                        <span className={'mt-6 content-center text-center text-xl font-semibold'}>
                                            {collectionItem.description}
                                        </span>
                        {
                            nftInfo.map((item: {
                                _id?: any;
                                amount?: number;
                                description?: string;
                                image?: string;
                                name?: string;
                                order?: any;
                                symbol?: string;
                            }) => {
                                return (
                                    <>
                                        <CollectionPack key={item._id} data={item}/>
                                    </>
                                )
                            })
                        }
                    </div>
                    </div>
            </Accordion.Content>
        </Accordion.Panel>

    )
}

export default CollectionItem
