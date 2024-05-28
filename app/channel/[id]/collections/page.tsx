"use client"
import React, {
    useCallback,
    useEffect,
    useState
}                               from 'react'
import Head                     from 'next/head'
import { useRouter }            from 'next/router';
import { getDetailChannel }     from '@app/services';
import { getChannelCollection } from '@app/services/inventoryService';
import { getUserInfo }          from '@app/utils/helpers';
import CollectionList           from '@app/components/Inventory/CollectionList';
import axios                    from 'axios';
import { useTranslation }       from 'next-i18next';
import { ChannelDetail }        from "@app/types/Channel";

function ChannelCollections() {
    const {t} = useTranslation()
    const router = useRouter();
    const [ detailChannel, setDetail ] = useState<ChannelDetail>();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ collectionData, setCollectionData ] = useState([])

    const onFetchCollection = useCallback(() => {
        const userInfo = getUserInfo()

        const getDetail = async () => {
            const res = await getDetailChannel(router.query.id);
            setDetail(res);
        }
        const getCollection = async () => {
            if (userInfo && userInfo.accessToken) {
                const {items} = await getChannelCollection(router.query.id);
                const data = await Promise.all(
                    items.map(async (_item: { metadata_uri: string; reward_data: any[]; }) => {
                        const resp = await axios.get(_item.metadata_uri)
                        return {
                            ..._item,
                            reward_data: _item?.reward_data?.[0],
                            ...resp.data || {}
                        }
                    })
                )
                setCollectionData(data as unknown as [])
            }
        }

        const combineFunction = async () => {
            getDetail && await getDetail();
            getCollection && await getCollection();
            setIsLoading(false)
        }

        if (router.query?.id) {
            combineFunction().then(r => {
            })
        }
    }, [ router.query?.id ])

    useEffect(() => {
        onFetchCollection()
    }, [ onFetchCollection ]);


    return (
        <>
            <Head>
                <title>{detailChannel?.name} {t('menu.collection')}</title>
            </Head>

            <div className="container">
                {
                    <>
                        <CollectionList data={collectionData} onFetchCollection={onFetchCollection}/>
                    </>
                }
            </div>
        </>
    )
}

export default ChannelCollections

