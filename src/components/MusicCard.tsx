"use client"

import { MusicInfo } from '@/helpers/types';
import Image from 'next/image'
import playButton from '@/public/static/images/play.svg'
import { useEffect, useState } from 'react'
import { useStore } from '@/helpers/store'

export default function MusicCard(musicInfo: MusicInfo) {
    const [hasCover, setHasCover] = useState<boolean>(false)

    const updateData = useStore((state: any) => state.updateSelectMusic)

    useEffect(() => {
        async function CoverStateCheck() {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cover/${musicInfo.id}`)
                res.ok ? setHasCover(true) : setHasCover(false)
            } catch (error) {
                console.error("MusicCard 서버 URL 연결 오류")
            }
        }
        CoverStateCheck()
    }, [])

    const handleIdData = () => {
        updateData(musicInfo.id)
    }

    return (
        <div>
            {musicInfo.id ?
                <div className="w-fit flex flex-col items-left mr-10">
                    <div onClick={handleIdData} className="h-52 w-52 hover:scale-[.95] duration-[.1s] relative overflow-hidden group">
                        {hasCover ? 
                            <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/cover/${musicInfo.id}`} alt='' fill style={{ objectFit: 'cover', borderRadius: "5px" }}></Image>
                            :
                            <div className="bg-stone-600 rounded-md h-52 w-52"></div>
                            
                        }
                        <div className="group-hover:shadow-[inset_0px_0px_75px_10px_rgba(0,_0,_0,_0.5)] h-full w-full absolute top-0"></div>
                        <div className="rounded-full bg-stone-800 opacity-[.65] absolute hidden duration-[0.2] group-hover:block h-20 w-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-active:bg-stone-400">
                            <div className="my-5 mx-5 flex flex-row justify-center items-center">
                                <Image src={playButton} alt='' width={1} height={1} style={{ objectFit: 'contain', width: "auto", height: '100%' }}></Image>
                            </div>
                        </div>
                    </div>
                    <span className="text-white font-bold text-2xl mt-2">{`${musicInfo.title}`}</span>
                    <span className="text-stone-400 font-semibold mt-[-3px]">{`${musicInfo.artist}`}</span>
                </div>
                :
                <div className="w-fit flex flex-col items-left mr-10">
                    <div className="bg-stone-600 rounded-md h-52 w-52"></div>
                    <div className="bg-stone-600 rounded-lg h-6 w-3/4 mt-3"></div>
                    <div className="bg-stone-600 rounded-lg h-4 w-3/5 mt-2"></div>
                </div>
            }
        </div>
    )
}