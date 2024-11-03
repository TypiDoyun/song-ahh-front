"use client"

import Header from '../components/Header';
import BottonBar from '../components/BottomBar';
// import ArtistCard from '../components/ArtistCard';
import MusicCard, { } from '../components/MusicCard';
import { useState, useEffect } from 'react';
import { MusicInfo } from '@/helpers/types';
import { useStore } from '@/helpers/store';

export default function Home() {
  const [musicInfoList, setMusicInfoList] = useState<MusicInfo[]>([])
  const musicId = useStore<number>((state) => state.selectedMusic)

  // useEffect(() => {
  //   const testFunction = musicIdSubject.subscribe((id) => {
  //     console.log(id)
  //   })
  //   return testFunction.unsubscribe;
  // }, [])

  useEffect(() => {
    async function FetchAudioData() {
      const getSessionMusicInfoList = await JSON.parse(sessionStorage.getItem('sessionMusicInfoList')!);
      try {
        if (await typeof window !== 'undefined') {
          if (!getSessionMusicInfoList) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/musics`)
              .then(res => res.json());
            if (res) {
              setMusicInfoList(res)
              sessionStorage.setItem("sessionMusicInfoList", JSON.stringify(res))
            } else {
              console.error("fetch 실패")
              setMusicInfoList([])
            }
          } else {
            setMusicInfoList(getSessionMusicInfoList!)
          }
        }
      } catch (error) {
        console.error("서버 연결 실패")
      }
    }
    FetchAudioData();
  }, [])
  return (
    <div className="h-auto">
      <Header />
      <BottonBar musicId={musicId}/>
      <div className='max-w-full h-[200vh] bg-[#151515] pt-[9vh] px-[7vw]'>
        {/* <div className="text-white font-bold text-4xl py-5">Artist</div>
        <div className="w-full flex flex-row items-center overflow-auto scrollbar pb-4">
          {musicInfoList.map(musicInfo => <ArtistCard {...musicInfo}/>)}
        </div> */}
        <div className="text-white font-bold text-4xl py-5 mt-20">All</div>
        <div className="w-full flex flex-row items-center overflow-auto scrollbar pb-4">
          {musicInfoList.map(musicInfo => <MusicCard {...musicInfo} />)}
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}
