'use client'
import React, {
    useEffect,
    useMemo,
    useState
}                                         from 'react'
import { ProfileInfo }                    from '@app/components/ListProfile'
import {
    useParams,
    useRouter,
    useSearchParams
}                                         from 'next/navigation'
import { MOCK_DETAIL_PROFILE_DATA, }      from '@app/utils/data'
import classNames                         from 'classnames'
import Head                               from 'next/head'
import NFTProfile                         from '@app/components/NFTProfile'
import ChannelPost                        from '@app/components/Channel/Post'
import {
    getDetailChannel,
    getMetadata,
    subscribeChannel
}                                         from '@app/services'
import {
    getUserInfo,
    numberFormatter
}                                         from '@app/utils/helpers'
import DonateModel                        from '@app/components/Channel/DonateModel';
import Statistic                          from '@app/components/Channel/Statistic'
import { ChannelDetail }                  from "@app/types/Channel";
import SocialList                         from "@app/components/SocialList";
import {
    Button,
    Card,
    Tooltip
}                                         from 'flowbite-react'
import { useToast }                       from "@app/hooks/useToast";
import { t }                              from '@app/utils/common'
import { useWalletModalContext }          from "@app/context/WalletContext";
import { useWriteConnectoProtocolDonate } from "@/Connecto-smart-contract-sdk";
import { ethers }                         from "ethers";
import { Address }                        from 'viem';
import { NATIVE_TOKEN }                   from "@app/consts/wagmiChain";


function DetailChannel() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const params = useParams()
    const userInfo = getUserInfo();
    const [ detailChannel, setDetail ] = useState<ChannelDetail>(MOCK_DETAIL_PROFILE_DATA);
    const [ isUserSubscribed, setSubscribed ] = useState(false);
    const [ isOpen, setOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const id = params.id as string
    const toast = useToast(5000);
    const walletContext = useWalletModalContext();
    const {writeContractAsync} = useWriteConnectoProtocolDonate();

    const selectedWalletMetadata = walletContext.selectedWalletMetadata;

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
                res?.nftCollections?.map(async (_item: any) => {
                    const getMetadataRes = await getMetadata(_item.address, '0')
                    return {
                        ..._item,
                        ...getMetadataRes
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

    const donateForIdol = async (donate: number) => {
        try {
            console.log('donateForIdol', donate)
            const donateAmount = ethers.utils.parseEther(donate.toString()).toBigInt();
            const donateResp = await writeContractAsync({
                address: "0xc7383EB2ebAa37953090BFde1f64e834fa6De0B5",
                args: [
                    detailChannel.donateReceiver as unknown as Address,
                    NATIVE_TOKEN,
                    donateAmount,
                ],
                value: donateAmount,
            })
            console.log(donateResp);
        } catch (err) {
            console.error('Donate errr', err)
            throw err
        }
    };

    const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));


    // @ts-ignore: any
    const donateForChannel = async (donate) => {
        try {
            console.log('donate', donate)
            await donateForIdol(donate.donate);
        } catch (error) {
            console.log('error: ', error)
            setIsLoading(false);

            toast('error', t('channel.donate_failed'));
        }
    };

    const handleDonate = () => {
        selectedWalletMetadata?.isConnected && setOpen(!isOpen);
        !selectedWalletMetadata?.isConnected &&
        toast('error' ,t('please_connect_wallet'));
    };

    const donateTooltip = useMemo(() => {
        return selectedWalletMetadata?.isConnected && walletContext?.userData?.user?.walletAddress ? "Donate for Idol" : 'Please connecto your wallet';
    }, [ selectedWalletMetadata ]);

    const subscribeChannelLabel = useMemo(() => {
        return isUserSubscribed ? "Subscribed" : "Subscribed";
    }, [ isUserSubscribed ]);

    return (
        <>
            <Head>
                <title>{detailChannel.name}</title>
            </Head>
            <div className={'mt-20 grid grid-flow-row-dense grid-cols-3 text-white gap-1'}>
                <article
                    className="items-center justify-center xl:gap-4 col-span-3 lg:col-span-2"
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
                                            disabled={!(selectedWalletMetadata?.isConnected && walletContext?.userData?.user?.walletAddress)}
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
                <div className={'mt-20 col-span-3 lg:col-span-1'}>
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
