"use client"
import React, {
    Children,
    useCallback,
    useEffect,
    useState
}                       from 'react';
import NftItem          from '../components/marketplace/NftItem';
import { PAGE_SIZE }    from '@app/utils/constants';
import { marketOrders } from '@app/services';

import Head                from 'next/head';
import { LoadingSkeleton } from "@app/components/LoadingSkeleton";
import { t }            from '@app/utils/common'

const Marketplace = () => {
    const [ nfts, setNfts ] = useState<any[]>([]);
    const [ totalPage, setTotalPage ] = useState(0);
    const [ isLoading, setLoading ] = useState(true);
    const [ page, setPage ] = useState(1);
    const [ size, setSize ] = useState(PAGE_SIZE);

    const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

    const getActiveListings = useCallback(async () => {
        const {data: {items, totalItems}} = await marketOrders({pageSize: size, pageIndex: page});
        await sleep(1000);
        setNfts(items);
        setLoading(false);
        setTotalPage(Math.ceil(totalItems / size));
    }, [page, size]);

    useEffect(() => {
        getActiveListings();
    }, [getActiveListings]);

    return (
        <>
            <Head>
                <title>{t('menu.marketplace')}</title>
            </Head>

            <div>
                <main className="mt-10 flex flex-col bg-gray-800">
                    <LoadingSkeleton isLoading={isLoading}></LoadingSkeleton>
                    <div className={'my-10 grid min-h-full grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4'}>
                        {
                            Children.toArray(
                                nfts.map((item) => 
                                    <NftItem item={item} getActiveListings={getActiveListings} />
                                )
                            )
                        }
                    </div>
                </main>
            </div>
        </>
    )
};

export default Marketplace;