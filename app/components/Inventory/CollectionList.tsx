import React, { useState } from 'react'
import CollectionItem from "@app/components/Inventory/CollectionItem.tsx";

export type CollectionListProps = {
    data: any[]
    onFetchCollection: (address?: string) => void
}


function CollectionList({data, onFetchCollection}: CollectionListProps) {
    return (
        <div className={'text-white'}>
            <h1 className={'text-3xl'}>Collections</h1>
            {Array.isArray(data) && data.length > 0 ? (
                data.map((collectionItem) => (
                    <CollectionItem data={collectionItem} key={collectionItem.address}></CollectionItem>))
            ) : ''}
        </div>
    )
}

export default CollectionList
