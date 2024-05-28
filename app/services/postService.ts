import { get, post } from './apiService';

export const getPosts = async (params: {} | undefined) => await get(`/posts`, params);
export const claimNFT = async (postId: any, params?: any) => await post(`/posts/${postId}/nft/claim`, params);