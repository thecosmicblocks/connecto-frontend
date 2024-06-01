'use client'
import Head                                 from 'next/head'
import React, {
    useCallback,
    useEffect,
    useState
}                                              from 'react'
import CollectionList, { CollectionListProps } from '@app/components/Inventory/CollectionList';
import { getUserInfo }                         from '@app/utils/helpers';
import { t }                                from '@app/utils/common'
import { getParticipatedCollectionAddress } from "@app/services";
import EmptyMessage            from "@app/components/EmptyMessage.tsx";
import CollectionItem          from "@app/components/Inventory/CollectionItem.tsx";

function Collections() {

    const [ collectionData, setCollectionData ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ params ] = useState({pageIndex: 1, pageSize: 6})
    const userInfo = getUserInfo()
    const getData = useCallback(async () => {
        if (userInfo?.user?.walletAddress) {
            const collections = await getParticipatedCollectionAddress()
            // @ts-ignore
            setCollectionData(collections.map(collection => ({...collection, ...collection.collection_info[0]})))

            setIsLoading(false)
        }
    }, [ params ])

    useEffect(() => {
        getData()
    }, [ getData ]);

    return (
        <>
            <Head>
                <title>{t('menu.collection')}</title>
            </Head>

                <div className="w-full mt-20">
                    {
                        (
                            <>
                                <CollectionList data={collectionData} onFetchCollection={getData}/>
                            </>
                        )
                    }
                </div>
        </>
    )
}


export default Collections

