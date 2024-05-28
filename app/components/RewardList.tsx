import EmptyMsg           from './EmptyMessage'
import { Card }           from "flowbite-react";
import dayjs              from "dayjs";

type NFTProfileProps = {
    data: {
        createdAt: string
    } | any[]
    className?: string
}
import {t} from '@app/utils/common'
export default function NFTProfile({data, className = ''}: NFTProfileProps) {
    const _data = Array.isArray(data) ? data : []

    return (
        <>
            {
                _data.length === 0 ? (
                    <EmptyMsg/>
                ) : (
                    <div
                        className={'grid grid-cols-2 gap-6'}
                    >
                        {
                            _data.map(_item => {
                                const rewardData = _item.reward_data
                                return (
                                    <div key={_item._id} className={'col-span-3 row-span-1'}>
                                        <Card
                                            key={_item.id}
                                        >
                                            <div className={'flex flex-col'}>
                                                <img
                                                    width={300}
                                                    height={384}
                                                    src={rewardData?.image_uri}
                                                    alt=""
                                                />
                                                <div className="">
                                                    <h4 className="mb-5">
                                                        {rewardData.name}
                                                    </h4>
                                                    <span className="">
                            {t('inventory.exchanged_at')}: {dayjs(_item.createdAt).format("YYYY-MM-DD")}
                          </span>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </>
    )
}
