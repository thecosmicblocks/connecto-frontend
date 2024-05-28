"use client";

export type TODO = any;

export type GetTokensQueryResult = {
    tokens: {
        __typename: string;
        data: TODO[];
        count: number;
        timestamp: number;
    }
}