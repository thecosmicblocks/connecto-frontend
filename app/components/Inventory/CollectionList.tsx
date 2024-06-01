import React, { useState } from 'react'
import {
    Accordion,
    Avatar,
    Button,
    Tooltip
}                          from "flowbite-react";
import EmptyMessage        from "@app/components/EmptyMessage.tsx";
import { useToast }        from "@app/hooks/useToast.tsx";
import {
    confirmExchangeCollection,
    requestExchangeCollection
}                          from "@app/services/inventoryService.ts";
import CollectionPack      from "@app/components/Inventory/CollectionPack.tsx";

type CollectionListProps = {
    data: any[]
    onFetchCollection: (address?: string) => void
}


function CollectionList({data, onFetchCollection}: CollectionListProps) {
    const [ isOpenModal, setIsOpenModal ] = useState(false)
    const [ isLoadingTransaction, setIsLoadingTransaction ] = useState(false)
    const [ isExpanded, setIsExpanded ] = useState(true)


    const onCloseModal = () => setIsOpenModal(false)
    const onOpenModal = () => setIsOpenModal(true)
    const toggleExpand = () => setIsExpanded(prev => !prev)
    const toast = useToast(4000)

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
        Array.isArray(data) && data.length > 0 ? (
            <Accordion className={'text-white'}>
                {
                    data.map((collectionItem) => {
                        const nftInfo = Array.isArray(collectionItem.nft_info) ? collectionItem.nft_info : []
                        const isExchangeable = nftInfo.every((_nft: { owned: any }) => _nft.owned)
                        return (<Accordion.Panel key={collectionItem.address}>
                            <div className={'flex justify-between'}>
                                <Button
                                    type={'button'}
                                    disabled={!isExchangeable} // || collectionItem.reward_history_data?.length === collectionItem.reward_data?.amount
                                    className={'m-3 h-1/2 content-center'}
                                    color={'red'}
                                    onClick={onOpenModal}
                                >Exchange</Button>
                                <Accordion.Title className={'flex w-full justify-between'}>
                                    <div className={'flex gap-3'}>
                                        <h3 className={'md:text-2xl'}>{collectionItem.name}</h3>
                                        <h5 className={'md:text-xl'}>({collectionItem.symbol})</h5>
                                    </div>
                                </Accordion.Title>
                            </div>
                            <Accordion.Content>
                                <div className={'md:grid md:grid-cols-4'}>
                                    <div
                                        className={'align-middle md:col-span-1 '}>
                                        {/*<div>*/}
                                        {/*    <span></span>*/}
                                        {/*</div>*/}
                                        <Tooltip
                                            content={`${collectionItem?.reward_data?.name} - ${collectionItem?.reward_data?.description}`}
                                            theme={{
                                                target: 'items-center content-center justify-center self-center text-center ',
                                            }}
                                        >
                                            <Avatar
                                                img={collectionItem.image}
                                                rounded
                                                size={'xl'}
                                                className={'content-center items-center justify-center self-center'}
                                            ></Avatar>
                                        </Tooltip>
                                        <span className={'mt-6 content-center text-center'}>
                                            {collectionItem.description}
                                        </span>
                                    </div>
                                    <div className={'grid gap-3 md:col-span-3 md:grid-cols-3'}>
                                        {
                                            collectionItem.nft_info.map((item: {
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
                        </Accordion.Panel>)
                    })
                }
            </Accordion>
        ) : (<EmptyMessage></EmptyMessage>)

    )
}

export default CollectionList
