// "use client"
//
// import { ProductItem }    from '@app/components/ProductItem';
// import {
//     ComponentProps,
// } from 'react';
// import classnames         from 'classnames';
//
// export const ListProfile: React.FC<ComponentProps<any>> = ({data, className}) => {
//     return (
//         <div className={classnames(className, "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-3")}>
//             {data && data.length ? data.map((item: any) => {
//                 return <ProductItem product={item} key={item.id}></ProductItem>
//             }) : (<></>)}
//         </div>
//     )
// }

import PropTypes           from 'prop-types'
import { numberFormatter } from "@app/utils/helpers";
import { Card }            from "flowbite-react";
import Link                from 'next/link';
import { BaseImage }       from "@app/components/BaseImage";
import { t }               from '@app/utils/common'

export interface ProfileInfoProps {
    metadata: {
        key: string,
        value: string
    }
}

export const ProfileInfo = ({metadata}: ProfileInfoProps) => {
    return (
        <li key={metadata.key} className={'text-white'}>
            <strong>{metadata.key}</strong>:{" "}
            {metadata.value}
        </li>
    )
}

export interface ListProfileProps {
    data: {
        _id: string,
        avatarUrl: string,
        channelName: string,
        country: {
            name: string
        },
        founded: string,
        follower: number,
        followerYoutube: number,
        followerTwitter: number,
    }[],
    total?: number,
    pageSize?: number,
    onPageChange?: (pageNumber: number) => void

}

export function ListProfile({
                                data, total = 100, onPageChange = () => {
    }, pageSize = 6,
                            }: ListProfileProps) {

    function handleClick(id: string) {
        return window.open(`channel/${id}`, '_blank');
    }
    return (
        <div className={"grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-3"}>
            {
                data?.map(_item => {
                    return (
                        <Card
                            className="hover:cursor-pointer"
                            onClick={() => {
                                handleClick(_item._id)
                            }}
                            key={_item.channelName}
                        >

                            <BaseImage
                                src={_item.avatarUrl}
                                alt={_item.channelName}
                            />

                            <Link href={`channel/${_item._id}`}>
                                <h4 className={"text-2xl  font-semibold tracking-tight text-gray-900 dark:text-white uppercase"}>
                                    {_item.channelName}
                                </h4>
                            </Link>
                            <ul className="">
                                <ProfileInfo
                                    metadata={{key: t('channel.country'), value: _item?.country?.name}}/>
                                <ProfileInfo metadata={{key: t("channel.founded"), value: _item?.founded}}/>
                                {/* <ProfileInfo metadata={{ key: "Main Game", value: _item?.mainGame }} /> */}
                                <ProfileInfo metadata={{
                                    key: t("channel.followers"),
                                    value: numberFormatter(_item?.follower || 0) as string
                                }}/>
                                <ProfileInfo metadata={{
                                    key: t("channel.youtube_followers"),
                                    value: numberFormatter(_item?.followerYoutube || 0) as string
                                }}/>
                                <ProfileInfo metadata={{
                                    key: t("channel.twitch_followers"),
                                    value: numberFormatter(_item?.followerTwitter || 0) as string
                                }}/>
                            </ul>
                        </Card>
                    )
                })
            }
        </div>
    )
}

ListProfile.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        href: PropTypes.string,
        metadata: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.string
        }))
    })).isRequired,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    onPageChange: PropTypes.func // pageNumber
}
