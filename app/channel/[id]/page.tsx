'use client'
import React, {
    useEffect,
    useMemo,
    useState
}                                    from 'react'
import { ProfileInfo }               from '@app/components/ListProfile'
import {
    useParams,
    useRouter,
    useSearchParams
}                                    from 'next/navigation'
import { MOCK_DETAIL_PROFILE_DATA, } from '@app/utils/data'
import classNames                    from 'classnames'
import Head                          from 'next/head'
import NFTProfile                    from '@app/components/NFTProfile'
import ChannelPost                   from '@app/components/Channel/Post'
import {
    donateChannel,
    getDetailChannel,
    subscribeChannel
}                                    from '@app/services'
import {
    compose,
    getUserInfo,
    numberFormatter
}                                    from '@app/utils/helpers'
import DonateModel                   from '@app/components/Channel/DonateModel';
import {
    useConnection,
    useWallet
}                                    from '@solana/wallet-adapter-react';
import axios                         from 'axios';
import Statistic                     from '@app/components/Channel/Statistic'
import { ChannelDetail }             from "@app/types/Channel";
import SocialList                    from "@app/components/SocialList";
import {
    Button,
    Card,
    Tooltip
}                                    from 'flowbite-react'
import { useToast }                  from "@app/hooks/useToast";
import { t } from '@app/utils/common'

function DetailChannel() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const params = useParams()
    const userInfo = getUserInfo();
    const [ detailChannel, setDetail ] = useState<ChannelDetail>(MOCK_DETAIL_PROFILE_DATA);
    const [ isUserSubscribed, setSubscribed ] = useState(false);
    const [ isOpen, setOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();
    const id = params.id as string
    const toast = useToast(5000);

    const userSubscribeChannel = async () => {
        if (!userInfo?.user?.walletAddress) {
            return toast('error', 'Please connect wallet!')
        }
        if (isUserSubscribed) return;
        const res = await subscribeChannel(id);
        res && setSubscribed(true);
        toast(res ? 'success' : 'error', t(res ? 'channel.subscribe_success' : 'channel.subscribe_failed'));
    }

    useEffect(() => {
        const getDetail = async () => {
            const res = await getDetailChannel(id);
            const nftCollectionData = await Promise.all(
                res?.nftCollections?.map(async (_item: { metadata_uri: string }) => {
                    const getMetadataRes = await axios.get(_item.metadata_uri)
                    return {
                        ..._item,
                        ...getMetadataRes.data
                    }
                }) || [ async () => {
                } ]
            )
            res.nftCollections = nftCollectionData || []
            setDetail(res);
            setSubscribed(!!res?.userSubcribe?.find((user: any) => user === userInfo?.user?.walletAddress));
        }
        getDetail && getDetail();
    }, [ id ]);

    const donateForIdol = async (args: { encode: any }) => {
        const {encode: transaction} = args;
        try {
            const signature = await sendTransaction(transaction, connection);
            return {...args, tx: signature};
        } catch (err) {
            throw err
        }
    };

    const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));
    const getDonateEndcode = async (args: { donate: any }) => {
        const {donate} = args;
        setIsLoading(true);
        //TODO
        const latestBlockhash = await connection.getLatestBlockhash();
        // const transaction = new Transaction().add(
        //     SystemProgram.transfer({
        //         fromPubkey: publicKey,
        //         toPubkey: new PublicKey(detailChannel.donateReceiver),
        //         lamports: LAMPORTS_PER_SOL * donate,
        //         latestBlockhash: latestBlockhash.blockhash,
        //     })
        // );
        return {...args, encode: {}};
    };

    const verifyTransaction = async (args: { tx: any; donate: any }) => {
        const {tx, donate} = args;
        await sleep(5000);
        const {context: {slot}} = await connection.confirmTransaction(tx, 'finalized');
        try {
            await donateChannel(detailChannel._id, {tx, amount: Number(donate)});
            return {...args, confirm: slot};
        } catch (err) {
            throw err;
        }
    }

    const notifyDonate = (args: { donate: any }) => {
        setTimeout(() => {
            setIsLoading(false);
            toast('success', t('channel.donate_success', args?.donate));
        }, 1000);
    };

    // @ts-ignore: any
    const donateForChannel = async (donate) => {
        try {
            await compose(notifyDonate, verifyTransaction, donateForIdol, getDonateEndcode)(donate);
        } catch (error) {
            setIsLoading(false);

            toast('error', t('donate_failed'));
        }
    };

    const handleDonate = () => {
        publicKey && setOpen(!isOpen);
        !publicKey &&
        toast('error' ,t('please_connect_wallet'));
    };

    const donateTooltip = useMemo(() => {
        return publicKey ? "Donate for Idol" : 'Please connecto your wallet';
    }, [ publicKey ]);

    const subscribeChannelLabel = useMemo(() => {
        return isUserSubscribed ? "Subscribed" : "Subscribed";
    }, [ isUserSubscribed ]);

    return (
        <>
            <Head>
                <title>{detailChannel.name}</title>
            </Head>
            <div className={'mt-20 flex-row text-white md:flex gap-2'}>
                <article
                    className="md:w-3/4"
                >
                    <h2 className={'text-2xl md:text-3xl '}>{detailChannel.channelName}</h2>
                    <div className={'flex md:flex-col'}>
                        <Card className="mt-10 w-full" imgSrc={detailChannel.avatarUrl} horizontal>
                            <h3 className={'text-2xl'}> {detailChannel.channelName}</h3>
                            <div className={'w-full flex-row md:gap-3'}>
                                <div className={'flex-row'}>
                                    <ul className="flex-row">
                                        <ProfileInfo metadata={{
                                            key: "Country",
                                            value: detailChannel?.country?.name as unknown as string
                                        }}/>
                                        <ProfileInfo
                                            metadata={{
                                                key: "Gender",
                                                value: detailChannel?.gender as unknown as string
                                            }}/>
                                        <ProfileInfo metadata={{
                                            key: "Date Of Birth",
                                            value: detailChannel?.dateOfBirth as unknown as string
                                        }}/>
                                        <ProfileInfo metadata={{
                                            key: "Professional Field",
                                            value: detailChannel?.professionalField as unknown as string
                                        }}/>
                                        <ProfileInfo metadata={{
                                            key: "Founded",
                                            value: detailChannel?.founded as unknown as string
                                        }}/>
                                        {/* <ProfileInfo metadata={{ key: "Main Game", value: detailChannel?.mainGame }} /> */}
                                        <ProfileInfo metadata={{
                                            key: "Followers",
                                            value: numberFormatter(detailChannel?.follower as unknown as number) as unknown as string
                                        }}/>
                                        <ProfileInfo metadata={{
                                            key: "Followers Youtube",
                                            value: numberFormatter(detailChannel?.followerYoutube as unknown as number) as unknown as string
                                        }}/>
                                        <ProfileInfo metadata={{
                                            key: 'Twitter Followers',
                                            value: numberFormatter(detailChannel?.followerTwitter as unknown as number) as unknown as string
                                        }}/>
                                    </ul>
                                </div>
                                <div className={'flex w-full flex-row justify-end gap-4 py-5'}>
                                    <Tooltip content={subscribeChannelLabel} placement={'bottom'}>
                                        <Button
                                            className={classNames('items-center justify-center px-[5px] py-[8px] md:px-[10px] md:py-[15px] font-extrabold uppercase')}
                                            onClick={userSubscribeChannel}
                                            color={'blue'}
                                        >
                                            {subscribeChannelLabel}
                                        </Button>
                                    </Tooltip>
                                    <Tooltip content={donateTooltip} placement='bottom'>
                                        <Button
                                            className={'items-center justify-center  px-[5px] py-[8px] md:px-[10px] md:py-[15px] font-extrabold uppercase'}
                                            onClick={handleDonate}
                                            isProcessing={isLoading}
                                            disabled={!publicKey}
                                            color={'red'}
                                        >
                                            Donate
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="mt-10"/>
                    <p className={'text-xl'}
                       dangerouslySetInnerHTML={{
                           __html: detailChannel?.description?.replace(/\n/g, "<br />") as unknown as string
                       }}
                    />

                    <div className={'mt-10'}>
                        <Statistic detail={detailChannel}/>
                    </div>
                    <div style={{marginTop: '60px'}}/>

                    <section className=''>
                        <h3 className='border-b-2 px-4  text-2xl'>{"ABOUT ME"}</h3>
                    </section>
                    <div className=""
                         dangerouslySetInnerHTML={{
                             __html: detailChannel.aboutMe as unknown as string
                         }}
                    />
                    <div style={{marginTop: '60px'}}/>

                    <section className=''>
                        <h3 className='border-b-2 px-4  text-2xl'>POST</h3>
                    </section>
                    <ChannelPost
                        posts={detailChannel.posts}
                        avatar={detailChannel?.avatarUrl}
                        channelName={detailChannel?.channelName}
                        channelId={detailChannel._id}
                    />
                </article>
                <div className={'mt-20 md:w-1/5'}>
                    <Card className={'p-1 w-full'}>
                        <SocialList detail={detailChannel}/>
                    </Card>
                    <Card>
                        <NFTProfile data={detailChannel.nftCollections} className='columns-1'/>
                        <Button
                            className='w-1/2'
                            color={'red'}
                            onClick={() => router.push(window.location.href + '/collections')}
                        >{"Detail"} {">"}</Button>
                    </Card>

                </div>
            </div>
            <DonateModel isOpen={isOpen} setOpen={setOpen} onConfirm={donateForChannel}/>
        </>
    )
}

export default DetailChannel
