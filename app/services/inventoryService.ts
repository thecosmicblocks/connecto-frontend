import {
    get,
    post,
} from './apiService'

export const getInventory = async (walletAddress: any, params: {} | undefined) => await get(`/nfts/users/${walletAddress}`, params)
export const getUserCollection = async (walletAddress: any, params: {} | undefined) => await get(`/nfts/users/${walletAddress}`, params)
export const getChannelCollection = async (channelId: any) => await get(`/nfts/channel/${channelId}`)
export const requestExchangeCollection = async (data: any) => await post(`/nfts/users/request-exchange`, data)
export const confirmExchangeCollection = async (data: any) => await post(`/nfts/users/confirm-exchange`, data)

export const getRewardHistory = async () => await get(`/rewards/history/users`)