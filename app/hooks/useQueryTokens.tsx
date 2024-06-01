"use client"

import { useSuspenseQuery } from "@apollo/client";
import { GetTokensQueryResult, TODO } from "../consts/type";
import { getTokensQuery } from "../consts/query";
import { Address } from "@unique-nft/utils";
import { getMetadata } from "../services";
import { useEffect, useState } from "react";

export const useQueryTokens = (walletAddr: string, collectionAddr: string) => {
    const [nftData, setNftData] = useState<TODO[]>([]);

    const { data, refetch } = useSuspenseQuery<GetTokensQueryResult>(getTokensQuery, {
        "variables": {
            "where": {
                "_and": [
                    {
                        "tokens_owner": { "_eq": walletAddr },
                    },
                    {
                        "burned": { "_eq": "false" }
                    },
                    {
                        "collection_id": { "_eq": Address.collection.addressToId(collectionAddr) }
                    }
                ]
            },
            "limit": 1000,
            "offset": 0,
            "attributesFilter": []
        },
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            if (data && data.tokens && data.tokens.data) {
                await Promise.all(
                    data.tokens.data.map(async (token) => {
                        return await getMetadata(collectionAddr, token.token_id)
                    })

                ).then((metadatas) => {                  
                    metadatas.forEach((metadata: any, index) => {
                        nftData[index] = {
                            ...data.tokens.data[index],
                            ...metadata,
                        }
                    })
                    setNftData(nftData)
                })
            }
        }
        if (data && data.tokens && data.tokens.data) {
            fetchMetadata()
        }
    }, [data, nftData, collectionAddr])
    

    return {
        data: data.tokens,
        nftData: nftData,
        refetch: refetch,
    }
}