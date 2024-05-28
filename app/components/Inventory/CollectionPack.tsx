import React          from 'react'
import { AiFillLock } from 'react-icons/ai'
import ListingItem    from '@app/components/marketplace/ListingItem';
import {
    Badge,
    Card,
    Popover
}                     from "flowbite-react";

type CollectionPackProps = {
    data: {
        amount: number,
        description: string,
        image: string,
        name: string,
        order: any,
        symbol: string,
    }
}

function CollectionPack({data}: CollectionPackProps) {
    if (!data) return <></>;

    return (
        <div className={'items-center'}>
            <Popover content={<ListingItem data={data}/>}>
            </Popover>
            <Popover content={<>
                <span>{data.name} ({data.symbol})</span>
                <div>
                    <p>{data.description}</p>
                    <p>Nft balance: {data.order?.length || 0}</p>
                </div>
            </>}>
                {data.amount ? (
                    <Badge
                        className={'items-center justify-center font-extrabold'}
                    >{data?.amount}</Badge>
                ) : (<AiFillLock/>)
                }
                <Card
                >
                    <img
                        src={data.image}
                        alt={data.name}
                        // onError={(event) => {
                        //     event.target.src = "/assets/thumbnail.png"
                        // }}
                    />
                    <span
                        className={'overflow-hidden text-ellipsis whitespace-nowrap'}
                        color={'white'}
                    >{data.name} ({data.symbol})</span>
                </Card>
            </Popover>
        </div>
    )
}

export default CollectionPack
