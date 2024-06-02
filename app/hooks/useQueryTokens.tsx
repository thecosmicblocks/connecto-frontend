"use client"

import { useSuspenseQuery } from "@apollo/client";
import { GetTokensQueryResult, TODO } from "../consts/type";
import { getTokensQuery } from "../consts/query";
import { Address } from "@unique-nft/utils";
import { getMetadata } from "../services";
import { useCallback, useEffect, useState } from "react";

export const useQueryTokens = (walletAddr: string, collectionAddr: string) => {
    const [nftData, _setNftData] = useState<TODO[]>([]);
    const setNftData = useCallback((data: TODO[]) => _setNftData(data), [])
    const { data, refetch } = useSuspenseQuery<GetTokensQueryResult>(getTokensQuery, {
        "variables": {
            "where": {
                "_and": [
                    {
                        "tokens_owner": { "_eq": walletAddr.toLowerCase() },
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
                    const fulfilledNft = metadatas.map((metadata: any, index) => {
                        console.log({
                            ...data.tokens.data[index],
                            ...metadata,
                        });
                        
                        return {
                            ...data.tokens.data[index],
                            ...metadata,
                        }
                    })
                    setNftData(fulfilledNft)
                })
            }
        }

        if (data && data.tokens && data.tokens.data && nftData.length === 0) {
            fetchMetadata()
        }
    }, [data, nftData.length, collectionAddr, setNftData])
    

    return {
        data: data.tokens,
        nftData: nftData,
        refetch: refetch,
    }
}