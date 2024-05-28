import ListingModal                       from '@app/components/marketplace/ListingModal'
import {
    cancelListingOrder,
    listingOrder,
}                                         from '@app/services'
import { confirmTransactionFromFrontend } from '@app/utils/helpers'
import { WalletAdapterNetwork }           from '@solana/wallet-adapter-base'
import {
    useConnection,
    useWallet,
}                                         from '@solana/wallet-adapter-react'
import axios                              from 'axios'
import { useTranslation }                 from 'next-i18next'
import React, {
    useMemo,
    useState,
}                                         from 'react'
import CancelListingModal                 from './CancelListingModal'
import { Button }                         from "flowbite-react";
import { useToast }                       from "@app/hooks/useToast";

export interface ListingItemProps {
    data: any;
}

const ListingItem = ({data}: ListingItemProps) => {
    const {t} = useTranslation()
    const [ isOpen, setOpen ] = useState(false)
    const [ isOpenCancel, setOpenCancel ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)
    const {publicKey, wallet, signTransaction} = useWallet()
    const {connection} = useConnection()
    const toast = useToast(4000)

    const getEncodeTransaction = async (args: { item: any }) => {
        const params = {
            network: WalletAdapterNetwork.Devnet,
            nft_address: args.item,
            sender: publicKey,
        }
        const {data: {result}} = await axios.post('/api/marketplace/listing-create', params)
        return {...args, encode: result?.result?.encoded_transaction}
    }

    const userSignTransaction = async (args: { price?: any; data?: any; item: any }) => {
        const {encode} = await getEncodeTransaction(args)
        const tx = await confirmTransactionFromFrontend(
            connection,
            encode,
            {wallet, signTransaction},
        )
        return {...args, tx}
    }

    const onListing = async ({price, item}: any, callback: () => void) => {
        try {
            const res = await userSignTransaction({price, data, item})
            const params = {
                mint: item,
                price: res.price,
                transaction: res.tx,
                title: res.data.name,
                image: res.data.image,
                infoId: data._id,
            }
            const responseOrder = await listingOrder(params)
            toast('success', t('listing.success'))
        } catch (err) {
            console.log('error:', err)
            toast('error', t('listing.failed'))
        }
        await sleep(1000)
        callback()
    }
    const onCancelListing = async ({item}: any, callback: () => void) => {
        try {
            const {data: result} = await cancelListingOrder({_id: item})
            result && toast('success', t('listing.cancel_success'))
            callback()
        } catch (err) {
            toast('error', t('listing.cancel_failed'))
        }
        await sleep(1000)
        setLoading(false)
    }
    const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms))
    const canncelListing = async () => {
        setLoading(true)
        setOpenCancel(true)
    }

    const listingItem = useMemo(() => {
        return data?.order?.filter((o: { order_id: any }) => o.order_id) || []
    }, [ data.order ])

    const nonListing = useMemo(() => {
        return data?.order?.filter((o: {
            order_id?: any
        }) => Object.keys(o).find(i => i === 'mint') && !o.order_id) || []
    }, [ data.order ])

    return (
        <>
            <div className={'mt-2 flex w-full flex-col items-center'}>
                {nonListing.length ? (
                    <Button
                        className={'w-full mb-2'}
                        disabled={!data.owned}
                        onClick={() => (data.owned && setOpen(true))}
                    >
                        {t('btn.listing')}
                    </Button>
                ) : ''}
                {listingItem.length ? (
                    <Button
                        color={'yellow'}
                        isProcessing={isLoading}
                        onClick={canncelListing}
                    >
                        {t('btn.cancel_listing')}
                    </Button>
                ) : ''}
            </div>
            <ListingModal
                isOpen={isOpen}
                setOpen={setOpen}
                onConfirm={onListing}
                listingItem={nonListing}
            />
            <CancelListingModal
                isOpen={isOpenCancel}
                setOpen={setOpenCancel}
                onConfirm={onCancelListing}
                listingItem={listingItem}
                parentCancel={setLoading}
            />
        </>
    )
}

export default React.memo(ListingItem)
