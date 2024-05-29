import { Footer }   from "flowbite-react";
import {
    BsDiscord,
    BsGithub,
    BsTwitter
} from "react-icons/bs";

export function GFooter() {
    return (
        <Footer container>
            <div className="w-full">
                <Footer.Divider/>
                <div className="grid w-full justify-between lg:justify-center sm:flex md:flex md:grid-cols-1 lg:gap-96">
                    <div className={'xl::ml-20 align-middle'}>
                        <Footer.Brand
                            href={process.env.NEXT_PUBLIC_URL || '/'}
                            src="/images/logo.svg"
                            width={'300px'}
                            height={'400px'}
                            className={'justify-center'}
                        >
                        </Footer.Brand>
                        <br/>
                        <h1 className={'text-5xl text-[#59C3DC] text-center'}>Connecto</h1>
                        {/*<h2 className={'text-3xl text-white'}>Swap Everything, Everywhere!</h2>*/}
                    </div>
                    <div className="mt-14 grid grid-cols-2 gap-0 sm:gap-6">
                        <div>
                            <Footer.Title title="Menu"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" className={"text-sm sm:text-lg"}>Marketplace</Footer.Link>
                                <Footer.Link href="#" className={"text-sm sm:text-lg"}>Channel</Footer.Link>
                                <Footer.Link href="#" className={"text-sm sm:text-lg"}>About Us</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        {/*<div>*/}
                        {/*    <Footer.Title title="Help Center"/>*/}
                        {/*    <Footer.LinkGroup col>*/}
                        {/*        <Footer.Link href={process.env.NEXT_GITHUB_URL || '#'}*/}
                        {/*                     target={"_blank"}*/}
                        {/*        >Github</Footer.Link>*/}
                        {/*        <Footer.Link  href={process.env.NEXT_X_URL || '#'}*/}
                        {/*                      >Twitter</Footer.Link>*/}
                        {/*        <Footer.Link href={process.env.NEXT_DISCORD_URL || '#'}*/}
                        {/*                     target={"_blank"}>Discord</Footer.Link>*/}
                        {/*    </Footer.LinkGroup>*/}
                        {/*</div>*/}
                        <div>
                            <Footer.Title title="Legal"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" className={"text-sm sm:text-lg"}>Privacy Policy</Footer.Link>
                                <Footer.Link href="#"
                                             className={"text-sm sm:text-lg"}>Terms &amp; Conditions</Footer.Link>
                                <Footer.Link href="#" className={"text-sm sm:text-lg"}>License</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider/>
                <div className="w-full justify-center max-sm:flex-col sm:flex sm:items-center sm:justify-between">
                    <div className={"flex justify-center"}>
                        <Footer.Copyright href="https://thecosmicblock.com" by="The Cosmic Block Labs™" year={2024}/>
                    </div>
                    <div className="mt-3 flex justify-center space-x-6 sm:mt-0 sm:justify-center">
                        {/*<Footer.Icon href={process.env.NEXT_FB_URL || process.env.NEXT_PUBLIC_SITE_URL}*/}
                        {/*             icon={BsFacebook}*/}
                        {/*             target={"_blank"}/>*/}
                        <Footer.Icon href={process.env.NEXT_DISCORD_URL || '#'}
                                     icon={BsDiscord}
                                     target={"_blank"}/>
                        <Footer.Icon
                            href={process.env.NEXT_X_URL || '#'}
                            icon={BsTwitter}
                            target={"_blank"}/>
                        <Footer.Icon
                            href={process.env.NEXT_GITHUB_URL || '#'}
                            icon={BsGithub}
                            target={"_blank"}/>
                    </div>
                </div>
            </div>
        </Footer>
    );
}
