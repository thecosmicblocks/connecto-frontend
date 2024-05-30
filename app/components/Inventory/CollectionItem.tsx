import React, { useState } from 'react'

import CollectionPack                     from './CollectionPack'
import {
    confirmExchangeCollection,
    requestExchangeCollection
}                                         from '@app/services/inventoryService'
import { FaAngleDown }                    from 'react-icons/fa'
import classNames                         from 'classnames'
import {
    Accordion,
    Avatar,
    Button,
    Card,
    Modal,
    Tooltip
}                                         from "flowbite-react";
import { useToast }                       from "@app/hooks/useToast";
import { t } from '@app/utils/common'
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

function CollectionItem({data, onFetchCollection}: CollectionItemProps) {
    const [ isOpenModal, setIsOpenModal ] = useState(false)
    const [ isLoadingTransaction, setIsLoadingTransaction ] = useState(false)
    const [ isExpanded, setIsExpanded ] = useState(true)


    const onCloseModal = () => setIsOpenModal(false)
    const onOpenModal = () => setIsOpenModal(true)
    const toggleExpand = () => setIsExpanded(prev => !prev)
    const toast = useToast(4000)

    if (!data) return <></>
    const nftInfo = Array.isArray(data.nft_info) ? data.nft_info : []
    const isExchangeable = nftInfo.every((_nft: { owned: any }) => _nft.owned)

    const onExchange = async () => {
        try {
            setIsLoadingTransaction(true)
            const requestExResp = await requestExchangeCollection({
                "collectionId": data._id,
                "channelId": data.channel_id
            })

            const completedTransaction = await Promise.all(
                requestExResp.encodedTxnData.map((_txData: WithImplicitCoercion<string> | {
                    [Symbol.toPrimitive](hint: "string"): string
                }) => {
                    // return confirmTransactionFromFrontend();
                })
            )

            const {message} = await confirmExchangeCollection({
                "channelId": data.channel_id,
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
        <section className='mb-80' id={data.address}>
            <Card>
                <div className={'justify-between'}>
                    <div className={'items-center gap-3'}>
                        <h3>{data.name}</h3>
                        <h5>({data.symbol})</h5>
                    </div>
                    <div className={'items-center gap-6'}>
                        <button
                            // TODO: fix this
                            disabled={!isExchangeable} // || data.reward_history_data?.length === data.reward_data?.amount
                            className={''}
                            onClick={onOpenModal}
                        >
                            {t('inventory.exchange')}
                        </button>

                        <FaAngleDown
                            fontSize='20'
                            className={classNames('expand-icon', {'rotate-close': !isExpanded})}
                            onClick={toggleExpand}
                        />
                    </div>
                </div>

                <div className={'flex flex-col gap-12'}>
                    <Avatar
                        img={data.image}
                    />
                    <Tooltip content={`${data?.reward_data?.name} - ${data?.reward_data?.description}`}>
                        <Avatar
                            img={data?.reward_data?.image_uri || ""}
                        />
                    </Tooltip>
                    <span className={'mt-6 content-center text-center text-xl font-semibold'}>
                        {data.description}
                    </span>
                    {
                        nftInfo.map(_item => {
                            return (
                                <>
                                    <CollectionPack key={_item._id} data={_item}/>
                                </>
                            )
                        })
                    }
                </div>
            </Card>

            <Modal onClose={onCloseModal}>
                <Modal.Header>
                    <h3>
                        {t('inventory.exchange')}
                    </h3>
                </Modal.Header>

                <Modal.Body>
                    <div className={'flex-col items-center'}>
                        <Avatar img={data.reward_data?.image_uri}/>
                        <p className={'mt-6'}>
                            {t('inventory.exchange_msg').replace("{{amount}}", nftInfo.length.toString()).replace("{{name}}", data.reward_data?.name?.toString())}
                        </p>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <div className={'flex'}>
                        <Button onClick={onCloseModal} color='#fff'
                        >
                            {t('inventory.close')}
                        </Button>
                        <Button isProcessing={isLoadingTransaction} color='red' onClick={onExchange}>
                            {t('inventory.confirm')}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default CollectionItem
