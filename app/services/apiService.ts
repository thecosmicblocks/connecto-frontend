import axios       from 'axios'
import { STORAGE } from '@app/utils/constants'
import { load }    from 'react-cookies'

const getUrlPrefix = () => '/v1'

const options = { baseURL: process.env.NEXT_PUBLIC_API_URL }
const instance = axios.create(options)

instance.interceptors.request.use(
    (config: any) => {
        const token = load(STORAGE.ACCESS_TOKEN) || ''
        if (token) instance.defaults.headers.common.Authorization = `${token}`
        return config
    },
    (error: any) => Promise.reject(error),
)
instance.interceptors.response.use(
    (response: any) => response,
    (error: any) => Promise.reject(error),
)


const get = async (url: string, params = {}) => {
    try {
        const config = { params }
        if (!instance.defaults.headers.common.Authorization) {
            const token = load(STORAGE.ACCESS_TOKEN) || ''
            if (token) instance.defaults.headers.common.Authorization = `${token}`
        }
        const { data: getData } = await instance.get(getUrlPrefix() + url, config)
        return getData
    } catch (error) {
        return _errorHandler(error)
    }
}

const put = async (url: string, data = {}) => {
    try {
        let response: any = {}
        if (data.toLocaleString() === '[object FormData]') {
            response = await instance.put(getUrlPrefix() + url, data)
        } else {
            response = await instance.put(getUrlPrefix() + url, data, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
        }
        return response.data
    } catch (error) {
        _errorHandler(error)
    }
}

const post = async (url: string, data?: any) => {
    try {
        const { data: postData } = await instance.post(getUrlPrefix() + url, data)
        return postData
    } catch (error) {
        _errorHandler(error)
    }
}

const del = async (url: string, data: any) => {
    try {
        const { data: delDate } = await instance.delete(getUrlPrefix() + url, { data })
        return delDate
    } catch (error) {
        _errorHandler(error)
    }
}
const _errorHandler = (err: any) => {
    if (axios.isAxiosError(err)) {
        return err.message
    } else {
        if (err.response && err.response.status === 401) {
            // todo
        }
        throw err
    }
}

export {
    get,
    post,
    del,
    put,
}
