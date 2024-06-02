import React from 'react'
import {
    Avatar,
    Card,
    Dropdown,
    Popover
}            from "flowbite-react";
import ListingItem from "@app/components/marketplace/ListingItem.tsx";

type CollectionPackProps = {
    data: {
        amount?: number,
        description?: string,
        image?: string,
        name?: string,
        nftData?: any[]
        order?: number
        symbol?: string,
        owned?: number,
    }
}

function CollectionPack({data}: CollectionPackProps) {
    console.log('CollectionPack', data)
    if (!data) return <></>;
    return (

        <Card>
            <div className={'flex justify-between'}>
                <p className={'text-red-300'}>Owned: {data.owned || 0}</p>
                <Dropdown inline label="" theme={{arrowIcon: 'mr-4'}}>
                    <Dropdown.Item>
                        <ListingItem data={data}></ListingItem>
                    </Dropdown.Item>
                </Dropdown>
            </div>
            <Avatar
                img={data.image}
                alt={data.name}
                onError={(event) => {
                    // @ts-ignore
                    event.target.src = "/assets/thumbnail.png"
                }}
                size={'xl'}
                rounded
            />
            <Popover trigger="hover"
                     content={
                         <div className={'bg-gray-700  dark:bg-gray-300'}>
                             <span className={' text-red-700'}>{data.description}</span>
                         </div>

                     }
                     color={'white'}
                     placement={'top'}
            >
                <span
                    className={'cursor-pointer text-lg font-bold text-red-500 underline'}
                    color={'white'}
                >{data.name} ({data.symbol})</span>
            </Popover>
        </Card>

    )
}

export default CollectionPack
