import React    from 'react'
import PostItem from './PostItem'

export interface IChannelPost {
    posts: any;
    avatar: string;
    channelName: string;
    channelId: string;

}

const ChannelPost = ({posts, avatar, channelName, channelId}: IChannelPost) => {
    return (
        <>
            <div className={'mt-4 flex flex-col content-center'}>
                {posts?.map((post: { _id: React.Key | null | undefined; }) => (
                    <PostItem
                        key={post._id}
                        post={post}
                        avatar={avatar}
                        channelName={channelName}
                        channelId={channelId}
                    />
                ))}
            </div>
        </>
    )
}

export default React.memo(ChannelPost)
