import React          from 'react'
import CollectionItem from './CollectionItem'
import EmptyMsg       from '../EmptyMessage'

type CollectionListProps = {
    data: any[]
    onFetchCollection: (address?: string) => void
}

function CollectionList({data, onFetchCollection}: CollectionListProps) {
    return (
        <div className={'text-white'}>
            {
                Array.isArray(data) && data.length > 0 ? (
                    <>
                        {
                            data.map((_item) => {
                                return (
                                    <CollectionItem onFetchCollection={onFetchCollection} key={_item.address}
                                                    data={_item}/>
                                )
                            })
                        }
                    </>
                ) : (
                    <EmptyMsg/>
                )
            }
        </div>
    )
}

export default CollectionList
