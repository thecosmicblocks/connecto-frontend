import React from 'react'
import { TbMoodEmpty } from 'react-icons/tb'
import { t } from '@app/utils/common'

function EmptyMsg() {

    return (
        <div className="text-4xl">
            <TbMoodEmpty />
            {t('inventory.nothing_to_display')}
        </div>
    )
}

export default EmptyMsg
