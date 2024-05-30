import {
    get,
    post
} from './apiService';

export const getChannels = async(params: {} | undefined)=> await get(`/channels`, params);
export const getDetailChannel = async(channelId: any)=> await get(`/channels/${channelId}`);
export const userVerifyTask = async(taskId: any, params: any) => await post(`/tasks/${taskId}/verify`, params);
export const subscribeChannel = async(channelId: any) => await post(`/channels/${channelId}/subscribe`);
export const generateTransactionEncode = async(channelId: any, params: any) => await post(`/channels/${channelId}/gen_transaction`, params);
export const donateChannel = async (params: any) => await post(`/channels/donate`, params);
