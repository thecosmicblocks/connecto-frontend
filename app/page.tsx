"use client"
import { ListProfile } from '@app/components/ListProfile';
import {
    useEffect,
    useState
}                      from 'react';
import Head            from "next/head";
import { useRouter }   from 'next/navigation';

import { getChannels }     from './services';
import { getPosts }        from './services/postService';
import supabase            from './utils/supabase';
import { getUserInfo }     from './utils/helpers';
import { LoadingSkeleton } from "@app/components/LoadingSkeleton";
import { useToast }        from "@app/hooks/useToast";

import { t } from '@app/utils/common';

export default function Home({}) {
    const [ channels, setChannels ] = useState([]);
    const [ pageParams ] = useState({pageSize: 6, pageIndex: 1});
    const [ postParams ] = useState({pageSize: 5, pageIndex: 1});
    const [ posts, setPosts ] = useState([]);
    const router = useRouter()
    const [ isLoading, setLoading ] = useState(true);
    const toast = useToast()
    useEffect(() => {
        const getAppChannels = async () => {
            const {items} = await getChannels(pageParams);
            setLoading(false);
            setChannels(items);
        }

        const getTopPost = async () => {
            const data = await getPosts(postParams);
            setPosts(data.slice(0, 5))
        }
        getAppChannels && getAppChannels();
        getTopPost && getTopPost();
    }, []);

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event) => {
            if (event === 'SIGNED_OUT') {
                toast(
                    'success',
                    t('profile.disconnect_discord_success'),
                )
            } else {
                const userInfo = getUserInfo()
                const session = await supabase.auth.getSession()
                if (
                    userInfo &&
                    !(userInfo.user.discordUsername && userInfo.user.discordId) &&
                    session.data.session
                ) {
                    router.push('/profile')
                }
            }
        })
    }, [])

    return (
        <div>
            <Head>
                <title>{t('header')}</title>
            </Head>
            <main className="mt-10 flex flex-col bg-gray-800">
                <div className={'my-10 min-h-full px-4'}>
                    <LoadingSkeleton isLoading={isLoading}></LoadingSkeleton>
                    <ListProfile data={channels}></ListProfile>
                </div>
            </main>
        </div>
    );
}

