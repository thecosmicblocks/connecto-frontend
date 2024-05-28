'use client'
import Head                  from 'next/head'
import React, {
    useCallback,
    useEffect,
    useState
}                            from 'react'
import CollectionList        from '@app/components/Inventory/CollectionList';
import { getUserInfo }       from '@app/utils/helpers';
import { getUserCollection } from '@app/services/inventoryService'
import axios                 from 'axios';
import { useTranslation }    from 'next-i18next';

function Collection() {
    const {t} = useTranslation('common')

    const [ collectionData, setCollectionData ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ params ] = useState({pageIndex: 1, pageSize: 6})

    const getData = useCallback(async () => {
        const userInfo = getUserInfo()
        if (userInfo?.user?.walletAddress) {
            const {items} = await getUserCollection(userInfo?.user?.walletAddress, params)
            const data = await Promise.all(
                items?.map(async (_item: { metadata_uri: string; reward_data: any[]; }) => {
                    const resp = await axios.get(_item.metadata_uri)
                    return {
                        ..._item,
                        reward_data: _item?.reward_data?.[0],
                        ...resp.data || {}
                    }
                })
            )
            // @ts-ignore
            setCollectionData(data)
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

            <div className="container">
                <div className="w-full">
                    {
                        (
                            <>
                                <CollectionList data={collectionData} onFetchCollection={getData}/>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Collection

