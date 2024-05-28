"use client"
import { useRouter } from "next/router";

const MyInventory = () => {
    const router = useRouter();
    router.push('/inventory/collection');
    return (<></>)
}

export default MyInventory;
