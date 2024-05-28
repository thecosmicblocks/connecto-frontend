import {
    Button,
    Modal
}                        from 'flowbite-react'
import React, {
    useEffect,
    useState,
}                        from 'react'
import { transferNFT }   from '@app/services'
import {
    compose,
    numberFormatter,
}                        from '@app/utils/helpers'
import { Processing }    from "@app/components/Processing";
import { FaCheckCircle } from "react-icons/fa";
import { useToast }      from "@app/hooks/useToast";
import { t }             from '@app/utils/common'

export interface BuyModalProps {
    item: any;
    isOpen: boolean;
    setOpen: (value: boolean) => void;
}

const BuyModal = ({item, isOpen, setOpen}: BuyModalProps) => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isSuccess, setSuccess ] = useState(false)
    const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms))
    const toast = useToast()
    const transferSolToSeller = async (args: { encode: any }) => {
        const {encode: transaction} = args
        try {
            // const signature = await sendTransaction(transaction, connection)
            // return {...args, tx: signature}
        } catch (err) {
            throw err
        }
    }

    const getTransferEndcode = async (args: { price: any; seller: any }) => {
        const {price, seller} = args
        setIsLoading(true)
        // const latestBlockhash = await connection.getLatestBlockhash()
        // const transaction = new Transaction().add(
        //     SystemProgram.transfer({
        //         // fromPubkey: publicKey as PublicKey,
        //         toPubkey: new PublicKey(seller),
        //         lamports: LAMPORTS_PER_SOL * price,
        //         //@ts-ignore
        //         latestBlockhash: latestBlockhash.blockhash,
        //     }),
        // )
        // return {...args, encode: transaction}
    }

    const verifyTransaction = async (args: { tx: any; price: any }) => {
        const {tx, price} = args
        await sleep(5000)
        // const {context: {slot}} = await connection.confirmTransaction(tx, 'finalized')
        try {
            await transferNFT({_id: item._id, tx})
            return {...args}
        } catch (err) {
            throw err
        }
    }

    const notificationAction = () => {
        setTimeout(() => {
            setIsLoading(false)
            toast('success', t('marketplace.noti_buy_nft_success'))
        }, 1000)
    }

    const onClose = async () => {
        try {
            setIsLoading(true)
            await compose(notificationAction, verifyTransaction, transferSolToSeller, getTransferEndcode)({...item})
            setIsLoading(false)
            setSuccess(true)
        } catch (error) {
            await sleep(1500)
            console.log(error)
            setIsLoading(false)
            toast('error', t('marketplace.noti_buy_nft_failed'))
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

    useEffect(() => {
        return () => {
            setSuccess(false)
        }
    }, [])

    return (
        <>
            <Modal show={isOpen} onClose={() => onClose()}>
                <Modal.Header>{t('marketplace.buy.header')}</Modal.Header>
                <Modal.Body>
                    <div className="justify-center">
                        {isSuccess && (
                            <FaCheckCircle color={'green'} height={16} width={16}></FaCheckCircle>
                        )}
                        <p
                            className={'text-center text-xl text-white font-semibold'}
                        >
                            <span>{t('marketplace.buy.nft_name',  item.title)} </span>
                            -
                            <span> {numberFormatter(item.price)} SOL</span>
                        </p>
                        <RenderProcess/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        !isSuccess ? (
                            <Button
                                color="blue"
                                onClick={onClose}
                                isProcessing={isLoading}
                                // disabled={!publicKey}
                            >
                                {isLoading ? 'Buying...' :
                                    t('marketplace.buy.btn_buy')
                                }
                            </Button>
                        ) : ''
                    }
                    <Button
                        onClick={() => setOpen(!isOpen)}
                        disabled={isLoading}
                    >{t('modal.btn_cancel')}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default React.memo(BuyModal)
