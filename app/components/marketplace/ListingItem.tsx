// import { confirmTransactionFromFrontend } from '@app/utils/helpers'
import React from 'react'
import {
    Button,
    Tooltip
}            from "flowbite-react";
import { t } from '@app/utils/common'

export interface ListingItemProps {
    data: any;
}

const ListingItem = ({data}: ListingItemProps) => {
    return (
        <>
            <div className={'mt-2 flex w-full min-w-20 flex-col items-center'}>
                <Tooltip content={'Comming Soon'}>
                    <Button
                        className={'mb-2 w-full'}
                        disabled={true}
                        // onClick={() => (data.owned && setOpen(true))}
                    >
                        {t('btn.listing')}
                    </Button>
                    <Button
                        color={'yellow'}
                        disabled={true}
                    >
                        {t('btn.cancel_listing')}
                    </Button>
                </Tooltip>

            </div>
        </>
    )
}

export default React.memo(ListingItem)
