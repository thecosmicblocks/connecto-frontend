'use client'
import ClaimNFTButton  from '@app/components/ClaimNFTButton'
import { getClaimNFTInfo }    from '@app/services/postService'
import { getUserInfo } from '@app/utils/helpers'
import { useRouter }   from 'next/navigation'
import React, {
    useMemo,
    useRef,
    useState,
}                      from 'react'
import TaskItem        from './TaskItem'
import {
    Alert,
    Button,
    Modal
}                      from "flowbite-react";
import { useToast }    from "@app/hooks/useToast";
import { t }           from "@app/utils/common";
import { getAddress } from 'viem'
import { useWriteConnectoNftManagerMintToCollection } from '@/Connecto-smart-contract-sdk'
import { CONTRACT_ADDRESS } from '@/app/utils/constants'
import { publicClient } from '@/app/consts/wagmiConfig'
import { opal } from '@/app/consts/wagmiChain'
import { HiInformationCircle } from 'react-icons/hi'

export interface TaskProps {
    channelId: string;
    post: any;

}

const Task = ({channelId, post}: TaskProps) => {
    const toast = useToast(4000)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ tasks, setTasks ] = useState(post?.tasks || [])
    const [ claimed, setClaimed ] = useState(false)
    const [ isOpenModal, setIsOpenModal ] = useState(false)
    const resultRef = useRef()
    const userInfo = getUserInfo()
    const isFinished = useMemo(() => {
        if (userInfo?.user?.walletAddress) {
            return tasks.filter((t: { userAddress: string[] }) => {
                return t.userAddress?.some((address: string) => getAddress(address) === getAddress(userInfo?.user?.walletAddress))
            }).length === tasks.length
        }
    }, [ tasks, userInfo?.user?.walletAddress ])
    const isClaimed = useMemo(() => {
        if (claimed) return claimed
        return Array.isArray(post?.userAddress) && post?.userAddress?.includes(userInfo?.user?.walletAddress)
    }, [ claimed, post?.userAddress, userInfo?.user?.walletAddress ])
    const isClaimable = isFinished && !isClaimed
    const router = useRouter()
    const { writeContractAsync } = useWriteConnectoNftManagerMintToCollection()

    const onClose = () => setIsOpenModal(false)

    const claimNft = async () => {
        const txData = await getClaimNFTInfo(post._id)
        if (!txData) {
            toast('error', t('channel.task.claim_failed'))
            return;
        }

        try {
            setIsLoading(true)
            const { claimSignature, orderId } = txData
            const txHash = await writeContractAsync({
                address: CONTRACT_ADDRESS.DEVELOPMENT.UNIQUE_CONNECTO_NFT_MANAGER,
                args: [
                    post.nftId.nft_collection_address,
                    userInfo?.user?.walletAddress,
                    orderId,
                    claimSignature,
                ],
            })
            await publicClient.waitForTransactionReceipt({
                hash: txHash
            });
            setIsOpenModal(true)
            setClaimed(true)
            setTimeout(() => {
                // @ts-ignore
                resultRef.current.setAttribute('href', `${opal.blockExplorers?.default.url}/tx/${receipt.txHash}`)
            }, 500)
        } catch (error) {
            toast('error', t('channel.task.claim_failed'))
        }
        
    }

    return (
        <div className={'mt-10 flex-col'}>
            <h4 className={'text-2xl'}>{'TASKS'}</h4>
            {tasks.map((task: { _id: React.Key | null | undefined }, index: any) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    index={index}
                    userInfo={userInfo}
                    channelId={channelId}
                    setTasks={setTasks}
                />
            ))}
            <ClaimNFTButton
                btnProps={{
                    style: {
                        cursor: isClaimable ? 'pointer' : 'not-allowed',
                    },
                    color: isClaimable ? 'red' : 'gray',
                    onClick: async () => {
                        if (!isClaimable) return;                        
                        await claimNft()
                    },
                    isLoading: isLoading,
                }}
                nftData={post.nftId}
            >
                {isClaimed ? 'Claimed' : 'Claim NFT'}
            </ClaimNFTButton>
            <Modal
                onClose={onClose}
                show={isOpenModal}
            >
                <Modal.Body>
                    <Alert
                        color="success"
                        icon={HiInformationCircle}
                        rounded
                        className="flex flex-col items-center justify-center align-middle"
                        additionalContent={<>
                            <a
                                //@ts-ignore
                                ref={resultRef}
                                target="_blank"
                                href=""
                                rel="nofollow"
                                className='bg-transparent'
                            >
                                {'View your NFT on Explorer'}
                            </a>
                        </>}
                    >
                        <span className="font-medium">Claim NFT successful!</span>
                    </Alert>
                    <div
                        className={'mt-5 flex w-full justify-center'}
                    >
                        <Button
                            className="mr-3"
                            onClick={() => {
                                router.push('/inventory/collection')
                            }}
                        >
                            {"Go to My Inventory"}
                        </Button>
                    </div>
                    <div
                        className={'mt-5 flex w-full justify-center'}
                    >
                        <Button
                            className="mr-3"
                            color={"gray"}
                            onClick={onClose}
                        >
                            {"Close"}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default React.memo(Task)
