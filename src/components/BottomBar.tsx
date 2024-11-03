import Image from 'next/image'
import playButton from '@/public/static/images/play.svg'
import { SelectedMusicId, MusicInfo } from '@/helpers/types';
import { useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';

export default function BottomBar(musicId: SelectedMusicId) {
    const [musicInfo, setMusicInfo] = useState<MusicInfo[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedMusic, setSelectedMusic] = useState<any>()
    const music = useRef(null)

    useEffect(() => {
        async function getMusicInfo() {
            await setIsLoading(true)
            const getSessionMusicInfoList: MusicInfo[] = await JSON.parse(sessionStorage.getItem('sessionMusicInfoList')!);
            if (musicId.musicId) {
                setMusicInfo(getSessionMusicInfoList.filter((musicInfo: MusicInfo) => {
                    return musicInfo.id == musicId.musicId;
                }))
                music.current = new Howl({
                    src: [`${process.env.NEXT_PUBLIC_SERVER_URL}/music/${musicId.musicId}`],
                    html5: true,
                    autoplay: false
                })
            }
            setIsLoading(musicId.musicId === 0)
        }
        getMusicInfo()
    }, [musicId.musicId])

    async function playMusic() {
        // await selectedMusic.pause()
        if(music.current) {
            music.current.play()
        }
    }

    return (
        <div className="w-full h-[10vh] bg-[#252525] fixed bottom-0 flex flex-row items-center border-t-[2px] border-[#404040] shadow-[0px_-5px_25px_0px_rgba(0,_0,_0,_0.5)] z-50">
            <div className="w-1/3 h-full flex flex-row  justify-center items-center">
                {selectedMusic ?
                    <div onClick={playMusic()} className='h-1/2 w-auto'>
                        <Image src={playButton} alt='' width={1} height={1} style={{ objectFit: 'contain', width: "auto", height: '100%' }}></Image>
                    </div>
                    :
                    <div className='h-1/2 w-auto'>
                        <Image src={playButton} alt='' width={1} height={1} style={{ objectFit: 'contain', width: "auto", height: '100%' }}></Image>
                    </div>
                }
            </div>
            {(musicId.musicId === 0 || isLoading || !musicInfo[0]) ?
                <div className="h-full w-1/3 py-3 flex flex-row items-center justify-center">
                    <div className="bg-stone-600 rounded-sm pb-2 h-full aspect-square"></div>
                    <div className="w-full h-full flex flex-col justify-between ml-2">
                        <div className="bg-stone-600 rounded-lg flex-grow-[2] w-full mb-2"></div>
                        <div className="bg-stone-600 rounded-lg flex-grow w-2/5"></div>
                    </div>
                </div>
                :
                <div className='h-full w-1/3 py-3 flex flex-row items-center justify-center'>
                    <div className='bg-stone-600 rounded-sm pb-2 h-full aspect-square relative'>
                        <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/cover/${musicId.musicId}`} alt='' fill style={{ objectFit: 'cover', borderRadius: "5px" }}></Image>
                    </div>
                    <div className="w-full h-full flex flex-col justify-between ml-2">
                        <div className='flex-grow-[2]'>
                            <span className='text-white font-bold'>{musicInfo[0].title}</span>
                        </div>
                        <div className='flex-grow'>
                            <span className='text-stone-400 font-semibold'>{musicInfo[0].artist}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}