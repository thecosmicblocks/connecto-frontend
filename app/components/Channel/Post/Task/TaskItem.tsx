import { userVerifyTask } from '@app/services'
import { TASK_TYPE }      from '@app/utils/constants'
import classNames         from 'classnames'
import React, {
    useEffect,
    useState,
}                         from 'react'
import {
    Button,
    Tooltip
}                         from "flowbite-react";
import { FaCheckCircle }  from "react-icons/fa";
import Link               from "next/link";
import { t }              from '@app/utils/common'
import { useToast }       from "@app/hooks/useToast";
import { getAddress } from 'viem';

export interface TaskItemProps {
    task: any;
    index: number;
    userInfo: any;
    channelId: string;
    setTasks: Function;
}

const TaskItem = ({task, index, userInfo, channelId, setTasks}: TaskItemProps) => {
    const toast = useToast(4000)
    const [ isSubscribed, setIsSubscribed ] = useState(false)
    useEffect(() => {
        const handleSubscribe = () => {
            const hasUser = userInfo?.user?.walletAddress
                && task.userAddress?.find((address: any) => getAddress(address) === getAddress(userInfo?.user?.walletAddress))
            setIsSubscribed(hasUser)
        }
        handleSubscribe && handleSubscribe()
    }, [ task, userInfo?.user?.walletAddress ])

    const verifyTask = async () => {
        if (isSubscribed) return

        const res = await userVerifyTask(task._id, {channelId})
        if (res) {
            setIsSubscribed(true)
            task.userAddress = (task.userAddress || []).concat(userInfo?.user?.walletAddress)
            setTasks((prev: any[]) => prev.map(_item => _item._id === task._id ? task : _item))
        }
        toast(res ? 'success' : 'error', t(`channel.task.${res ? 'verify_success' : 'verify_failed'}`))
    }

    return (
        <div className={'flex items-center py-8'}
        >
            <Tooltip content={isSubscribed ? 'Verified' : 'Verify task'}>
                <FaCheckCircle
                    size={42}
                    // @ts-ignore
                    color={isSubscribed && 'green.700'}
                    cursor={'pointer'}
                    onClick={verifyTask}
                    className={'m-4'}
                />
            </Tooltip>
            <div className={'flex flex-col w-full'}
            >
                <h5
                >{index + 1}. {task.name}</h5>
                <p
                >
                    {task.description}
                    {
                        task.taskType === TASK_TYPE.JOIN_DISCORD && (
                            <>
                                <br/>
                                {t('channel.task.join_channel')}
                                <Link
                                    color="#dd163b"
                                    href={task.taskInfo?.link || '#'}
                                    target="_blank"
                                >
                                    {task.taskInfo?.title}
                                </Link>
                            </>
                        )
                    }
                </p>
            </div>
            <div className={'ml-5'}>
                <Button
                    onClick={verifyTask}
                    disabled={isSubscribed}
                    className={classNames('nk-btn nk-btn-color-main-1 subscribe-btn', {'task-done-btn': isSubscribed})}
                >{t(isSubscribed ? 'channel.task.completed' : 'channel.task.verify')}</Button>
            </div>
        </div>
    )
}

export default React.memo(TaskItem)
