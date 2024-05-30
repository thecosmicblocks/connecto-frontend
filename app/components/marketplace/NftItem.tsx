import { subAddress, }     from '@app/utils/helpers'
import {t} from '@app/utils/common'
import React, { useState } from 'react'
import BuyModal            from './BuyModal'
import {
    Avatar,
    Card
}                          from "flowbite-react";
import { BaseImage }       from "@app/components/BaseImage";
import { useMinidenticon } from '@/app/hooks/useMinidenticon';

export interface NftItemProps {
    item: any;
    getActiveListings: any;
}

const NftItem = ({ item, getActiveListings }: NftItemProps) => {
    const [ isOpen, setOpen ] = useState(false)

    return (
        <>
            <BuyModal
                item={item}
                isOpen={isOpen}
                onClose={async () => {
                    setOpen(false)
                    await getActiveListings()
                }}
            />

            <Card
                className="hover:cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <div className={'!h-[300px]'}>
                    <BaseImage
                        src={item.infoId.image}
                        alt={item.title}
                    />
                </div>
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.title}
                </h5>
                <div className="flex items-center">
                    <div className={'flex gap-1'}>
                        {/* <img src="https://static.goswapshop.com/assets/usdc.svg" alt="" width={24}/> */}
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            {item.price}&nbsp;$OPL
                        </span>
                    </div>
                </div>
                <div className="mb-2 mt-0.5 flex flex-wrap items-center justify-between gap-2">
                    <div className={'flex flex-col'}>
                        <Avatar img={useMinidenticon({username: item.seller, saturation: 1, lightness: 100})} rounded bordered
                                status="online" statusPosition="bottom-right">
                            <div className="space-y-1 font-medium dark:text-white">
                                <span>{subAddress(item.seller)}</span>
                            </div>
                        </Avatar>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default React.memo(NftItem)
