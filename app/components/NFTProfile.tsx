import classNames      from "classnames";
import { TbMoodEmpty } from 'react-icons/tb'
import Link            from "next/link";
import dayjs           from 'dayjs';
import { t }           from "@app/utils/common";
import React      from "react";
import { Avatar } from "flowbite-react";

type NFTProfileProps = {
    data: any
    className: any
}
export default function NFTProfile({data, className = ''}: NFTProfileProps) {
    const _data = Array.isArray(data) ? data : []
  
    return (
        <ul className={classNames("products", {[className]: true})}>
            {
                _data.length === 0 ? (
                    <div>
                        <TbMoodEmpty size={30}/>
                        {t('nft.no_data')}
                    </div>
                ) : (
                    _data.map((_item, index) => {
                        return (
                            <li key={`item-index-${index}`}
                                className="mt-4"
                            >
                                <div className="flex gap-2">
                                    <Link
                                        href={_item.external_url}
                                        target="_blank"
                                        className="min-w-36"
                                    >
                                        <Avatar size="xl"
                                            img={_item.image}
                                        />
                                    </Link>
                                    <div className="">
                                        <h3 className="">
                                            <Link
                                                href={_item.external_url}
                                                target="_blank"
                                            >
                                                {_item.name}
                                            </Link>
                                        </h3>
                                        <p
                                            className="line-clamp-3"
                                            dangerouslySetInnerHTML={{
                                                __html: _item?.description?.replace(/\n/g, '<br />')
                                            }}
                                        />
                                        <hr className="my-2 w-1/2"/>
                                        <span>{t('nft.symbol').replace('{{symbol}}', `${_item.symbol}`)}</span><br/>
                                        <span className="">
                                            {t('nft.released_at').replace('{{time}}', dayjs(data.createdAt).format("YYYY MMM DD"))}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                )
            }
        </ul>
    )
}
