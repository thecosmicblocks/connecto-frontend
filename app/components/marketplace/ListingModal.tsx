import React, {
    useEffect,
    useRef,
    useState,
}                     from 'react'
import { Processing } from "@app/components/Processing";
import {
    Button,
    Modal,
    Select,
    TextInput
}                     from "flowbite-react";
import { t }          from '@app/utils/common'
import { useToast }   from "@app/hooks/useToast";

export interface ListingModalProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    onConfirm: (data: any, callback: () => void) => void;
    listingItem: any;

}

const ListingModal = ({isOpen, setOpen, onConfirm, listingItem}: ListingModalProps) => {
    const [ price, setPrice ] = useState(0)
    const [ item, setItem ] = useState()
    const [ isLoading, setLoading ] = useState(false)
    const inputPrice = useRef()
    const toast = useToast()
    const callback = () => {
        setLoading(false)
        setOpen(false)
    }

    const handleChangeSelection = (e: { target: { value: React.SetStateAction<undefined>; }; }) => {
        setItem(e.target.value)
    }

    const onClose = () => {
        setLoading(true)
        !price && toast('error', t('modal.listing.required_amount'))
        !price && setLoading(false)
        //@ts-ignore
        !price && inputPrice.current.focus()
        price && onConfirm({price, item}, callback)
    }

    const RenderProcess = () => {
        return (
            <>
                {isLoading && (
                    <Processing></Processing>
                )}
            </>
        )
    }

    useEffect(() => {
        return () => {
            setLoading(false)
        }
    }, [])

    return (
        <>
            <Modal
                onClose={onClose}
            >

                    <Modal.Header color={'white'}>
                        <h4>{t('modal.listing.header')}</h4>
                    </Modal.Header>
                    <Modal.Body className={'pb-6'}>
                            <TextInput
                                type="number"
                                borderRadius={'20px'}
                                borderWidth={'1px'}
                                borderColor={'gray.300'}
                                bg={'white'}
                                //@ts-ignore
                                onChange={(e) => setPrice(e?.target?.value)}
                                placeholder={t('modal.listing.amount_placeholder')}
                                //@ts-ignore
                                ref={inputPrice}
                            />
                        <Select
                            defaultValue={'default'}
                            //@ts-ignore
                            onChange={handleChangeSelection}
                            borderRadius={'full'}
                        >
                            <option
                                value={'default'}
                                disabled
                            >{t('modal.listing.select_item_placeholder')}</option>
                            {listingItem.map((item: {
                                mint: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | React.Key | null | undefined;
                            }) => (<option
                                //@ts-ignore
                                value={item.mint}
                                //@ts-ignore
                                key={item.mint}
                            >{item.mint}</option>))}
                        </Select>
                        <RenderProcess/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            color="blue"
                            onClick={onClose}
                        >
                            {t('modal.listing.btn_listing')}
                        </Button>
                        <Button onClick={() => setOpen(!isOpen)}>{t('modal.btn_cancel')}</Button>
                    </Modal.Footer>
            </Modal>
        </>
    )
}

export default React.memo(ListingModal)
