import React      from 'react'
import Task       from './Task'
import { Avatar } from "flowbite-react";
import dayjs      from "dayjs";
import Image      from 'next/image';
export interface PostItemProps {
    post: any;
    avatar: string;
    channelName: string;
    channelId: string;
}

const PostItem = ({post, avatar, channelName, channelId}: PostItemProps) => {
    const {images} = post
    const [ thumbnail ] = images
    return (
        <div className={'flex w-full flex-col items-center mt-8 border-b-2 border-teal-500 py-8'}>
            <h3
                className={'mb-3 text-3xl'}
            >{post?.title}</h3>
            <div className={'w-1/2'}>
                <img
                    src={thumbnail}
                    alt={post?.title}
                    title={post?.title}
                />
            </div>
            <div className={'my-4 items-center align-middle'}>
                <Avatar
                    img={avatar}
                    title="avatar"
                />
                <span
                >{'By '}</span>
                <span
                    color={'red'}
                    className={'text-red-600 font-bold'}
                >{channelName}</span>
                <span
                >{' in'} {dayjs(post.createdAt).format("YYYY-MM-DD")}</span>
            </div>
            <p
                dangerouslySetInnerHTML={{__html: post.content.replace(/\n/g, '<br />')}}
            ></p>
            <Task
                post={post}
                channelId={channelId}
            />
        </div>
    )
}

export default React.memo(PostItem)
