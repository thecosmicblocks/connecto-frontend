import classnames       from "classnames";
import { CardSkeleton } from "@app/components/skeleton/Card";
import React            from "react";

export const LoadingSkeleton = ({isLoading}: { isLoading: boolean }) => {
    return (
        <>
            {isLoading &&
                <div
                    className={classnames("grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-3")}>
                    {Array(8).fill(0).map((_, index) => {
                        return (
                            <CardSkeleton key={index}></CardSkeleton>
                        )
                    })}
                </div>
            }
        </>
    )
}