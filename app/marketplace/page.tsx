"use client"
import React, {
    useEffect,
    useState
}                          from 'react';
import NftItem             from '../components/marketplace/NftItem';
import { PAGE_SIZE }       from '@app/utils/constants';
import { marketOrders }    from '@app/services';
import { useTranslation }  from 'next-i18next';
import Head                from 'next/head';
import { LoadingSkeleton } from "@app/components/LoadingSkeleton";

const Marketplace = () => {
    const {t} = useTranslation('common');
    const [ nfts, setNfts ] = useState([]);
    const [ totalPage, setTotalPage ] = useState(0);
    const [ isLoading, setLoading ] = useState(true);
    const [ page, setPage ] = useState(1);
    const [ size, setSize ] = useState(PAGE_SIZE);

    const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const getActiveListings = async () => {
            const {data: {items, totalItems}} = await marketOrders({pageSize: size, pageIndex: page});
            await sleep(1000);
            setNfts(items);
            setLoading(false);
            setTotalPage(Math.ceil(totalItems / size));
        };
        getActiveListings && getActiveListings();
    }, [ page, size ]);

    return (
        <>
            <Head>
                <title>{t('menu.marketplace')}</title>
            </Head>

            <div>
                <main className="mt-10 flex flex-col bg-gray-800">
                    <LoadingSkeleton isLoading={isLoading}></LoadingSkeleton>
                    <div className={'my-10 min-h-full px-4'}>
                        {nfts.map((item, index) => <NftItem item={item} key={`nft-${index}`}/>)}
                    </div>
                </main>
            </div>
        </>
    )
};

export default Marketplace;