import cookie      from 'react-cookies'
import { STORAGE } from './constants'

export const numberFormatter = (n: number) => {
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
    return n
}

export const getUserInfo = () => {
    const userInfo = cookie.load(STORAGE.USER_INFO)
    const accessToken = cookie.load(STORAGE.ACCESS_TOKEN)
    if (userInfo && accessToken) {
        return {
            user: cookie.load(STORAGE.USER_INFO),
            accessToken: cookie.load(STORAGE.ACCESS_TOKEN),
        }
    }

    return undefined
}

export const saveUserInfo = (data: { user: any; accessToken: any }) => {
    if (!data || !data.accessToken || !data.user) return
    cookie.save(STORAGE.USER_INFO, JSON.stringify(data?.user), {})
    cookie.save(STORAGE.ACCESS_TOKEN, data?.accessToken, {})
}

export const clearUserInfo = () => {
    cookie.remove(STORAGE.USER_INFO)
    cookie.remove(STORAGE.ACCESS_TOKEN)
}
//@ts-ignore
const composeReduce = (f: (arg0: any) => any, g: (arg0: any) => any) => async (...args: any) => f(await g(...args))
export const compose = (...fns: any[]) => fns.reduce(composeReduce)

export const subAddress = (address: string) => {
    const before = address.substr(0, 6)
    const after = address.substr(-4)
    return `${before}...${after}`
}

//
// export async function confirmTransactionFromFrontend(connection: Connection, encodedTransaction: WithImplicitCoercion<string> | {
//     [Symbol.toPrimitive](hint: 'string'): string
// }, wallet: { wallet?: Wallet | null; signTransaction: any }) {
//     const recoveredTransaction = Transaction.from(
//         Buffer.from(encodedTransaction, 'base64'),
//     )
//     const signedTx = await wallet.signTransaction(recoveredTransaction)
//     const confirmTransaction = await connection.sendRawTransaction(
//         signedTx.serialize(),
//     )
//     return confirmTransaction
// }

