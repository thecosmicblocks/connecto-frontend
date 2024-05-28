import { post } from './apiService'

export const connectToDiscord = (data: any) => post('/users/sns/discord/connect', data)
export const connectWallet = (data: any) => post('/auth/connect-wallet', data)