export type ChannelDetail = {
    channelName: string
    name: string
    _id: string
    donateReceiver?: string
    avatarUrl: string
    country?: {
        name?: string
    }
    gender?: string
    dateOfBirth?: string
    professionalField?: string
    founded?: string
    follower?: number
    followerYoutube?: number
    followerTwitter?: number
    description?: string
    bio?: string
    posts?: any[]
    numberSubscribers?: number;
    numberPosts?: number;
    amountDonate?: number;
    numberCollections?: number;
    nftCollections?: any[]
    metadata?: any[]
    href?: string
    aboutMe:string
    socialLinks?: any[]
}   