'use client'
import Head                 from "next/head";
import RewardItem           from "@app/components/RewardList";
import {
    useCallback,
    useEffect,
    useState
}                           from "react";
import { getRewardHistory } from '@app/services/inventoryService'
import { getUserInfo }      from "@app/utils/helpers";
import { LoadingSkeleton }  from "@app/components/LoadingSkeleton";
import { t }                from '@app/utils/common'

export default function MyInventory() {

    const [ rewardHistory, setRewardHistory ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

    const getData = useCallback(async () => {
        const userInfo = getUserInfo()
        if (userInfo?.user) {
            const resp = await getRewardHistory()
            if (!resp || !resp.items) {
                return
            }

            const data = resp.items.map((_item: { reward_data: any[]; }) => {
                _item.reward_data = _item.reward_data[0]
                return _item
            })
            setRewardHistory(data)
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        getData()
    }, [ getData ]);

    return (
        <>
            <Head>
                <title>{t('menu.reward')}</title>
            </Head>
            <div className="mt-20">
                {
                    isLoading ? (
                        <LoadingSkeleton isLoading={isLoading}/>
                    ) : (
                        <>
                            <RewardItem data={rewardHistory} className="columns-2"/>
                            {/* <Pagination pageCount={Math.ceil()} onPageChange={() => { }} /> */}
                        </>
                    )
                }
            </div>

        </>
    )
}