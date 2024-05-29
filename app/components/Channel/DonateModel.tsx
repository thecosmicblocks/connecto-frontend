import React, {
    useRef,
    useState,
}                   from 'react'
import {
    Button,
    Modal,
    TextInput
}                   from "flowbite-react";
import { t }        from '@app/utils/common'
import { useToast } from "@app/hooks/useToast";

export interface DonateModalProps {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    onConfirm: (data: { donate: number }) => void;
}

const DonateModal = ({ isOpen, setOpen, onConfirm }: DonateModalProps) => {
    const [donate, setDonate] = useState(0)
    const inputDonate = useRef()
    const toast = useToast(4000)
    const onClose = () => {
        !donate && toast('error', t('modal.donate.required_amount'))

        //@ts-ignore
        !donate && inputDonate.current.focus()
        donate && setOpen(!isOpen)
        donate && onConfirm({ donate })
    }

    return (
        <>
            <Modal
                onClose={() => setOpen(!isOpen)}
                show={isOpen}
            >
                    <Modal.Header color={'white'}>
                        <h4>Donate to idol</h4>
                    </Modal.Header>
                    <Modal.Body className={'pb-6'}>
                        <TextInput
                            type="number"
                            borderRadius={'20px'}
                            borderWidth={'1px'}
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
