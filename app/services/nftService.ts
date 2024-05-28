import {
    get,
    post,
} from './apiService'

export const listingOrder = async (params: any) => await post('/nfts/listing-order', params)
export const marketOrders = async (params: {} | undefined) => await get('/nfts/market-orders', params)
export const transferNFT = async (params: any) => await post('/nfts/market-buy-order', params)
export const cancelListingOrder = async (params: any) => await post('/nfts/market-cancel-order', params)
