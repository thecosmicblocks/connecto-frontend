import { Button } from "flowbite-react";

type ClaimNFTButtonProps = {
    btnProps: any;
    children: any;
    nftData: any;

}
export default function ClaimNFTButton({btnProps, children, nftData}: ClaimNFTButtonProps) {
    return (

        <div className={'flex flex-row justify-between rounded-2xl border p-5 align-middle'}>
            <img
                height={200}
                width={100}
                src={nftData?.image}
                alt=""
                onError={(event) => {
                    //@ts-ignore
                    event.target.src = '/images/thumbnail.png'
                }}
            />
            <h5 className={'justify-items-center self-center align-baseline text-xl md:text-3xl'}>
                {nftData?.name}
            </h5>
            <Button
                size={'lg'}
                type={'button'}
                className={'h-1/2 self-center justify-self-end align-middle'}
                {...btnProps}
            >
                <span className={'self-center align-middle'}>
                    {children}
                </span>
            </Button>
        </div>
    )
}