import Section from "./Section";
import {
    BsInstagram,
    BsTwitch,
    BsTwitter,
    BsYoutube
}              from 'react-icons/bs'
import Link    from "next/link";
import {
    Button,
    Tooltip
}              from "flowbite-react";

type SocialListProps = {
    detail: {
        socialLinks?: {
            name: string;
            url: string;
        }[];
    };
}
type SocialLink = {
    youtube?: string;
    twitch?: string;
    twitter?: string;
    instagram?: string;
}

export default function SocialList({detail}: SocialListProps) {
    const socialLinks: SocialLink = detail?.socialLinks?.reduce((a, v) => ({...a, [v.name]: v.url}), {}) || {}

    return (
        <Section title={'Social Links'}>
            <div className="mt-2">
                <ul className="flex gap-1">
                    <Tooltip content={'Youtube'} placement={'bottom'}>
                        <Button className={'md:p-2 items-center self-center'} type={'button'} color={'red'}>
                            <Link
                                href={socialLinks.youtube || "#"}
                                rel="nofollow"
                                target="_blank"
                                type={'button'}
                            >
                                <BsYoutube size={32}/>
                            </Link>
                        </Button>
                    </Tooltip>
                    <Tooltip content={'Twitch'} placement={'bottom'}>
                        <Button className={'md:p-2  items-center self-center'} type={'button'} color={'blue'}>
                            <Link
                                href={socialLinks.twitch || "#"}
                                target="_blank"
                            >
                                <BsTwitch size={"32"}/>
                            </Link>
                        </Button>
                    </Tooltip>
                    <Tooltip content={'Tweeter'} placement={'bottom'}>

                        <Button className={'md:p-2 items-center self-center'} type={'button'}>
                            <Link
                                href={socialLinks.twitter || "#"}
                                rel="nofollow"
                                target="_blank"
                                className={'hover:cursor-pointer hover:bg-green-700'}
                            >
                                <BsTwitter size={"32"}/>
                            </Link>
                        </Button>
                    </Tooltip>
                    <Tooltip content={'Instagram'} placement={'bottom'}>
                        <Button className={'md:p-2 items-center self-center'} type={'button'} color={'green'}>
                            <Link
                                href={socialLinks.instagram || "#"}
                                rel="nofollow"
                                target="_blank"
                            >
                                <BsInstagram size={"32"}/>
                            </Link>
                        </Button>
                    </Tooltip>
                </ul>
            </div>
        </Section>

    )
}
