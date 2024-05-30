import { minidenticon } from 'minidenticons'
import { ImageProps } from 'next/image'
import { useMemo } from 'react'

export const useMinidenticon = ({ username, saturation, lightness, ...props }: Partial<ImageProps> & { username: string, saturation: number, lightness: number }) => {
    const svgURI = useMemo(
        () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
        [username, saturation, lightness]
    )
    return svgURI
}