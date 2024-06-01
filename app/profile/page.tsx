"use client"
import Head                            from 'next/head'
import React, {
    useEffect,
    useState
}                                      from 'react'
import {
    getUserInfo,
    saveUserInfo
}                                      from '@app/utils/helpers'
import supabase, { signInWithDiscord } from '@app/utils/supabase'
import { connectToDiscord }            from '@app/services/authService';
import {
    Button,
    Label
}                                      from "flowbite-react";
import { useToast }                    from "@app/hooks/useToast";
import { t } from '@app/utils/common'

function Profile() {
    const userInfo = getUserInfo()
    const toast = useToast(4000)
    const [ refresh, setRefresh ] = useState(0)

    const onSignInDiscord = () => {
        signInWithDiscord()
            .then(({error}: { error: any }) => {
                if (error) {
                    toast('error', t('profile.authorize_discord_failed'))
                }
            })
    }

    useEffect(() => {
        if (!userInfo || (userInfo.user.discordId && userInfo.user.discordUsername)) return;

        supabase.auth.getSession()
            .then((res: { data: { session: any } }) => {
                if (res.data.session) {
                    return supabase.auth.getUser()
                }
            })
            .then((resp: any) => {
                if (!resp) return;
                const {data} = resp
                if (data?.user) {
                    userInfo.user.discordId = data.user.user_metadata.provider_id;
                    userInfo.user.discordUsername = data.user.user_metadata.name
                    return connectToDiscord({
                        discordId: data.user.user_metadata.provider_id,
                        discordUsername: data.user.user_metadata.name
                    })
                } else {
                    toast('error', t('profile.confirm_connect_with_discord_failed'),)
                }
            })
            .then((resp: { message: any }) => {
                if (resp && resp.message) {
                    saveUserInfo(userInfo)
                    setRefresh(Math.random())
                }
            })
    }, [ userInfo ])

    return (
        <>
            <Head>
                <title>{t('menu.profile')}</title>
            </Head>
            <div className="mt-20 flex-row text-white gap-10">
                <div className={'flex gap-5 p-10'}>
                    <Label>{t('profile.wallet_address')}:</Label>
                    <span className={'size-5'}>{userInfo?.user?.walletAddress}</span>
                </div>
                <div className={'flex gap-5 p-10 align-middle content-center items-center'}>
                    <Label>Discord:</Label>
                    {
                        userInfo?.user?.discordUsername ? (
                            <span>
                                        <span>{userInfo?.user?.discordUsername?.split('#')[0] || ""}</span>
                                        <Button
                                            className=''
                                            color='white'
                                            onClick={() => {
                                            }}
                                        >{t('profile.disconnect')}</Button>
                                    </span>
                        ) : (
                            <Button
                                color={'red'}
                                onClick={onSignInDiscord}
                            >{t('profile.connect_with_discord')}</Button>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Profile