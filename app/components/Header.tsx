'use client'

import { ToggleWalletModalBtn } from '@app/components/WalletModal'
import { Navbar }      from 'flowbite-react'
import {
    ComponentProps,
    useEffect
}                      from 'react'
import { usePathname } from 'next/navigation';

export const Header: React.FC<ComponentProps<any>> = ({children}) => {
    const pathname = usePathname();
    useEffect(() => {
    }, [])
    return (
        <Navbar
            fluid
            rounded
            className={'w-full'}
        >
            <Navbar.Brand href="/">
                <img
                    src="/images/logo.svg"
                    className="h-10 sm:h-14 md:h-10"
                    alt="Connecto"
                />
                {/*<span*/}
                {/*    className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"*/}
                {/*>Connecto</span>*/}
            </Navbar.Brand>

            <div className="flex md:order-2">
                <Navbar.Toggle className={"text-white"}/>
            </div>
            <Navbar.Collapse>
                <div className={'flex flex-col justify-between gap-5 xl:gap-10 md:flex-row'}>
                        <Navbar.Link href="/" active={[ '/' ].includes(pathname)} className={'text-lg'}>
                            Channels
                        </Navbar.Link>
                        <Navbar.Link target='_blank'  href="https://www.thecosmicblock.com/" active={[ '/marketplace' ].includes(pathname)} className={'text-lg'}>
                            Marketplace
                        </Navbar.Link>
                </div>
                <ToggleWalletModalBtn
                    className={"flex my-5 w-full md:absolute md:right-5 lg:right-12 xl:right-36 md:my-[-7px] md:w-auto"}
                />
            </Navbar.Collapse>
        </Navbar>
    )
}
