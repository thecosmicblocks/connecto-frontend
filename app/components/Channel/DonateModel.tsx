import { useTranslation } from 'next-i18next'
import React, {
    useRef,
    useState,
}                         from 'react'
import {
    Button,
    Modal,
    TextInput
} from "flowbite-react";

export interface DonateModalProps {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    onConfirm: (data: { donate: number }) => void;
}

const DonateModal = ({ isOpen, setOpen, onConfirm }: DonateModalProps) => {
    const { t } = useTranslation('common')
    const [donate, setDonate] = useState(0)
    const inputDonate = useRef()
    const onClose = () => {
        // !donate && toast({
        //     title: t('modal.donate.required_amount'),
        //     status: 'error',
        //     isClosable: true,
        //     position: 'top',
        // })
        //@ts-ignore
        !donate && inputDonate.current.focus()
        donate && setOpen(!isOpen)
        donate && onConfirm({ donate })
    }

    return (
        <>
            <Modal
                onClose={() => setOpen(!isOpen)}
            >
                    <Modal.Header color={'white'}>
                        <h4>Donate to idol</h4>
                    </Modal.Header>
                    <Modal.Body className={'pb-6'}>
                        <TextInput
                            type="number"
                            borderRadius={'20px'}
                            borderWidth={'1px'}
                            borderColor={'gray.300'}
                            bg={'white'}
                            //@ts-ignore
                            onChange={(e) => setDonate(e?.target?.value)}
                            placeholder={"Enter donation..."}
                            //@ts-ignore
                            ref={inputDonate}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            className={'mr-3'}
                            color="blue"
                            onClick={onClose}
                        >
                            {"Donate"}
                        </Button>
                        <Button onClick={() => setOpen(!isOpen)}>{"Cancel"}</Button>
                    </Modal.Footer>
            </Modal>
        </>
    )
}

export default React.memo(DonateModal)
