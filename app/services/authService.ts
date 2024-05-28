import { post } from './apiService'

export const connectToDiscord = (data: any) => post('/users/sns/discord/connect', data)