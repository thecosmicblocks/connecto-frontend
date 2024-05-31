import {
    Button,
    Modal
}                        from 'flowbite-react'
import React, {
    useState,
}                        from 'react'
import {
    compose,
    numberFormatter,
}                        from '@app/utils/helpers'
import { Processing }    from "@app/components/Processing";
import { useToast }      from "@app/hooks/useToast";
import { t }             from '@app/utils/common'
import { useWriteConnectoMarketplaceBuy } from '@/Connecto-smart-contract-sdk';
import { CONTRACT_ADDRESS, ListingType } from '@/app/utils/constants';
import { useWalletModalContext } from '@/app/context/WalletContext';
import { ethers } from 'ethers';
import { publicClient } from '@/app/consts/wagmiConfig';
import { buyOrder } from '@/app/services';

export interface BuyModalProps {
    item: any;
    isOpen: boolean;
    onClose: any;
}

const BuyModal = ({ item, isOpen, onClose }: BuyModalProps) => {
    const [ isLoading, setIsLoading ] = useState(false)
    const { writeContractAsync } = useWriteConnectoMarketplaceBuy()
    const { userData } = useWalletModalContext()
    const toast = useToast()
    const { selectedWalletMetadata } = useWalletModalContext();

    const updateMarketItem = async ({ _id }: any) => {
        await buyOrder(_id)
    }

    const sendBuyTransaction = async ({ 
        signature,
        price,
        assetContract,
        currencyAddress,
        startTime,
        endTime,
        tokenId,
        listingId,
        seller,
        _id
    }: any) => {
        try {
            const priceWDecimals = ethers.utils.parseEther(price);
            const buyTxHash = await writeContractAsync({
                address: CONTRACT_ADDRESS.DEVELOPMENT.UNIQUE_CONNECTO_MARKETPLACE,
                args: [
                    {
                        listingId: listingId,
                        tokenOwner: seller,
                        assetContract: assetContract,
                        tokenId: tokenId,
                        startTime: startTime,
                        endTime: endTime,
                        currency: currencyAddress,
                        reservePricePerToken: priceWDecimals.toBigInt(),
                        buyoutPricePerToken: priceWDecimals.toBigInt(),
                        listingType: ListingType.Direct,
                    },
                    userData.user.walletAddress,
                    signature,
                ],
                value: priceWDecimals.toBigInt(),
            })
            await publicClient.waitForTransactionReceipt({
                hash: buyTxHash
            })
            return {
                txHash: buyTxHash,
                _id: _id,
            }
        } catch (err) {
            throw err
        }
    }

    const notificationAction = () => {
        setTimeout(() => {
            toast('success', t('marketplace.noti_buy_nft_success'))
        }, 1000)
    }

    const onBuy = async () => {
        if (!selectedWalletMetadata) return;
        try {
            setIsLoading(true)
            await selectedWalletMetadata.switchChain();
            await compose(notificationAction, updateMarketItem, sendBuyTransaction)({...item})
            onClose()
        } catch (error) {
            console.log(error)
            toast('error', t('marketplace.noti_buy_nft_failed'))
        } finally {
            setIsLoading(false)
        }
    }

    const RenderProcess = () => {
        return (
            <>
                {isLoading && (
                    <Processing/>
                )}
            </>
        )
    }

    return (
        <>
            <Modal show={isOpen} onClose={onClose}>
                <Modal.Header>{t('marketplace.buy.header')}</Modal.Header>
                <Modal.Body>
                    <div className="justify-center">
                        <p
                            className={'text-center text-xl font-semibold text-white'}
                        >
                            <span>{t('marketplace.buy.nft_name').replace('{{name}}', item.title)} </span>
                            <br />
                            <span>Price: {numberFormatter(item.price)} $OPL</span>
                        </p>
                        <RenderProcess/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="blue"
                        onClick={onBuy}
                        isProcessing={isLoading}
                        // disabled={!publicKey}
                    >
                        {isLoading ? 'Buying...' :
                            t('marketplace.buy.btn_buy')
                        }
                    </Button>
                    <Button
                        onClick={onClose}
                        disabled={isLoading}
                    >{t('modal.btn_cancel')}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default React.memo(BuyModal)
