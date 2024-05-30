import { numberFormatter }      from '@app/utils/helpers'
import React                    from 'react'
import { AiOutlineLike }        from 'react-icons/ai'
import { BsFillCollectionFill } from 'react-icons/bs'
import { FaDonate }             from 'react-icons/fa'
import { MdOutlinePublish }     from 'react-icons/md'
import {
    Badge,
    Card,
    Tooltip
} from "flowbite-react";

export interface StatisticProps {
    detail: {
        numberSubscribers?: number;
        numberPosts?: number;
        amountDonate?: number;
        numberCollections?: number;
    };
}

const badgeStyle = 'justify-center items-center border h-20 w-36 gap-2'
const Statistic = ({detail}: StatisticProps) => {
    return (
        <Card>
            <div className="block w-full">
                <h3
                    className={'flex px-4 text-2xl'}
                >STATISTICS</h3>
            </div>
            <div className={'mt-8 w-full grid grid-flow-row  xs:grid-cols-2 sm:grid-cols-2  md:grid-cols-4 gap-3 gap-y-2'}>
                <Tooltip content={'Subscribe'}>
                    <div className={'flex items-center justify-center'}>
                        <Badge
                            size="xl"
                            color={'gray-500'}
                            className={badgeStyle}
                            icon={AiOutlineLike}
                        >
                            <span className={'md:ml-3'}>
                            {numberFormatter(detail?.numberSubscribers as unknown as number)}
                            </span>
                        </Badge>
                    </div>
                </Tooltip>
                <Tooltip content={'Published Posts'}>
                    <div className={'flex items-center justify-center'}>
                        <Badge
                            size="xl"
                            color={'gray-500'}
                            icon={MdOutlinePublish}
                            className={badgeStyle}
                        >
                            <span className={'ml-3'}>
                            {numberFormatter(detail?.numberPosts as unknown as number)}
                            </span>
                        </Badge>
                    </div>
                </Tooltip>
                <Tooltip content={"Donate"}>
                    <div className={'flex items-center justify-center'}>
                        <Badge
                            color={'white'}
                            icon={FaDonate}
                            className={badgeStyle}
                            size="lg"
                        >
                               <span className={'lg:ml-2'}>
                            {`${numberFormatter(detail?.amountDonate as unknown as number)} OPL`}
                                </span>
                        </Badge>
                    </div>
                </Tooltip>
                <Tooltip content={'Collection'}>
                    <div className={'flex items-center justify-center'}>
                        <Badge
                            size="lg"
                            color={'white'}
                            className={badgeStyle}
                            icon={BsFillCollectionFill}
                        >
                            <span className={'ml-3'}>
                            {numberFormatter(detail?.numberCollections as unknown as number)}
                            </span>
                        </Badge>
                    </div>
                </Tooltip>
            </div>
        </Card>
    )
}

export default React.memo(Statistic)
