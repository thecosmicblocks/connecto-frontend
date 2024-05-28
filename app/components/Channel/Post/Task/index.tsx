'use client'
import ClaimNFTButton  from '@app/components/ClaimNFTButton'
import { claimNFT }    from '@app/services/postService'
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
            return tasks.filter((t: { userAddress: string | any[] }) => {
                return t.userAddress?.includes(userInfo?.user?.walletAddress)
            }).length === tasks.length
        }
    }, [ tasks, userInfo?.user?.walletAddress ])
    const isClaimed = useMemo(() => {
        if (claimed) return claimed
        return Array.isArray(post?.userAddress) && post?.userAddress?.includes(userInfo?.user?.walletAddress)
    }, [ claimed, post?.userAddress, userInfo?.user?.walletAddress ])
    const isClaimable = isFinished && !isClaimed
    const router = useRouter()

    const onClose = () => setIsOpenModal(false)

    const claimNft = async () => {
        setIsLoading(true)
        const receipt = await claimNFT(post._id)
        if (!receipt) {
            toast('error', t('channel.task.claim_failed'))
        } else {
            setIsOpenModal(true)
            setClaimed(true)
            setTimeout(() => {
                // @ts-ignore
                resultRef.current.setAttribute('href', `https://translator.shyft.to/tx/${receipt.txnSignature}?cluster=devnet`)
            }, 500)
        }
        setIsLoading(false)
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
                    onClick: () => {
                        if (isClaimable) {
                            claimNft().then(r => {
                            })
                        }
                    },
                    isLoading: isLoading,
                }}
                nftData={post.nftId}
            >
                {isClaimed ? 'Claimed' : 'Claim NFT'}
            </ClaimNFTButton>
            <Modal
                onClose={onClose}
            >
                <Modal.Body>
                    <Alert
                        className="flex flex-col items-center justify-center align-middle"
                        title={'Claim NFT successful!'}
                    >
                        <a
                            //@ts-ignore
                            ref={resultRef}
                            target="_blank"
                            href=""
                            rel="nofollow"
                        >
                            {'View your NFT on Explorer'}
                        </a>
                    </Alert>
                    <div
                        className={'mb-5 justify-center'}
                    >
                        <Button
                            className="mr-3"
                            // @ts-ignore
                            onClick={() => {
                                router.push('inventory/collection')
                            }}
                        >
                            {"Go to My Inventory"}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default React.memo(Task)
