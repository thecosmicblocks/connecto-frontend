"use client"
import React, {
    useCallback,
    useEffect,
    useState
}                               from 'react'
import Head                     from 'next/head'
import { getDetailChannel, getMetadata }     from '@app/services';
import { getChannelCollection } from '@app/services/inventoryService';
import { getUserInfo }          from '@app/utils/helpers';
import CollectionList           from '@app/components/Inventory/CollectionList';
import axios                    from 'axios';
import { ChannelDetail }        from "@app/types/Channel";
import { useParams } from "next/navigation";
import { t }         from '@app/utils/common'

function ChannelCollections() {
    const params = useParams()
    const [ detailChannel, setDetail ] = useState<ChannelDetail>();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ collectionData, setCollectionData ] = useState([])
    const id = params.id
    const onFetchCollection = useCallback(() => {
        const userInfo = getUserInfo()

        const getDetail = async () => {
            const res = await getDetailChannel(params.id);
            setDetail(res);
        }
        const getCollection = async () => {
            if (userInfo && userInfo.accessToken) {
                const {items} = await getChannelCollection(params.id);
                const data = await Promise.all(
                    items.map(async (_item: { address: string; reward_data: any[]; }) => {
                        const res = await getMetadata(_item.address, '0')
                        return {
                            ..._item,
                            ...res || {}
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

        if (id) {
            combineFunction().then(r => {
            })
        }
    }, [ id ])

    useEffect(() => {
        onFetchCollection()
    }, [ onFetchCollection ]);


    return (
        <>
            <Head>
                <title>{detailChannel?.name} {t('menu.collection')}</title>
            </Head>

            <div className="mt-20">
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

