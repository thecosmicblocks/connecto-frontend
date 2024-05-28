import {
    Button,
    Modal,
} from 'flowbite-react'

import React, {
    useEffect,
    useState,
}                     from 'react'
import { Processing } from "@app/components/Processing";
import { useToast }   from "@app/hooks/useToast";
import { t }          from '@app/utils/common'

export interface CancelListingModalProps {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    onConfirm: (args: any, callback: () => void) => void;
    listingItem: any;
    parentCancel: (value: boolean) => void;
}

const CancelListingModal = ({isOpen, setOpen, onConfirm, listingItem, parentCancel}: CancelListingModalProps) => {
    const [ item, setItem ] = useState()
    const [ isLoading, setLoading ] = useState(false)
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

        !item && toast('error', t('modal.cancel_listing.required_item'))
        item && onConfirm({item}, callback)
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
                show={isOpen}
                onClose={onClose}
            >
                <Modal.Header color={'white'}>
                    <h4>{t('modal.listing.header')}</h4>
                </Modal.Header>
                <Modal.Body className={'pb-6'}>
                    {/*<Select*/}
                    {/*    // @ts-ignore*/}
                    {/*    onChange={handleChangeSelection}*/}
                    {/*    borderRadius={'full'}*/}
                    {/*>*/}
                    {/*    <option*/}
                    {/*        selected*/}
                    {/*        disabled*/}
                    {/*    >Select listing item...*/}
                    {/*    </option>*/}
                    {/*    {listingItem.map((item: {*/}
                    {/*        order_id: string | number | readonly string[] | undefined;*/}
                    {/*        mint: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | React.Key | null | undefined;*/}
                    {/*    }) => (<option*/}
                    {/*        value={item.order_id}*/}
                    {/*        // @ts-ignore*/}
                    {/*        key={item.mint}*/}
                    {/*    >{item.mint}</option>))}*/}
                    {/*</Select>*/}
                    <RenderProcess/>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="blue"
                        onClick={onClose}
                        isProcessing={isLoading}
                        // loadingText="Canceling..."
                    >
                        {t('modal.listing.btn_cancel')}
                    </Button>
                    <Button
                        onClick={() => {
                            setOpen(!isOpen)
                            parentCancel(false)
                        }}
                        disabled={isLoading}
                    >
                        {t('modal.btn_cancel')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default React.memo(CancelListingModal)
