import React, { useState } from 'react'

import CollectionPack     from './CollectionPack'
import {
    Accordion,
    Avatar,
    Button,
    Tooltip
}                         from "flowbite-react";
import { useQueryTokens } from "@app/hooks/useQueryTokens.tsx";
import { getUserInfo }    from "@app/utils/helpers.ts";

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
            order: number,
            attributes: any[],
            symbol: string,
        }[],
        reward_data: {
            description: string,
            image_uri: string,
            name: string,
        }[],
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
    const onOpenModal = () => setIsOpenModal(true)
    const userInfo = getUserInfo()
    const {nftData} = useQueryTokens(userInfo?.user.walletAddress, collectionItem.address)
    if (!collectionItem || !nftData) return <></>
    const nftInfo = collectionItem.nft_info.map(nft => {
        let count = 0
        nftData.map(token => {
            if (token.attributes[0].value === nft.attributes[0].value) {
                count++
            }
        })
        return {...nft, order: count}
    })
    const isExchangeable = nftInfo.every((_nft: { order: number }) => !!_nft.order)

    return (
        <Accordion className={'text-white'}>
            <Accordion.Panel>
                <div className={'flex justify-between'}>
                    <Button
                        type={'button'}
                        disabled={!isExchangeable} // || collectionItem.reward_history_data?.length === collectionItem.reward_data?.amount
                        className={'m-3 h-1/2 content-center'}
                        color={'red'}
                        onClick={onOpenModal}
                    >Exchange</Button>
                    <Accordion.Title className={''}>
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
                                content={`${collectionItem?.reward_data['0']?.name} - ${collectionItem?.reward_data[0]?.description}`}
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
        </Accordion>)
}

export default CollectionItem
