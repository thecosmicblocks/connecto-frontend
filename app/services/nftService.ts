import {
    get,
    post,
} from './apiService'

export const listingOrder = async (params: any) => await post('/nfts/listing-order', params)
export const marketOrders = async (params: {} | undefined) => await get('/nfts/market-orders', params)
export const buyOrder = async (params: any) => await post('/nfts/market-buy-order', params)
export const cancelListingOrder = async (params: any) => await post('/nfts/market-cancel-order', params)
export const getMetadata = async (collectionAddr: string, nftId: string) => await get(`/nfts/metadata/${collectionAddr}/${nftId}`)
export const getParticipatedCollectionAddress = async () => await get(`/nfts/participated-collection`)