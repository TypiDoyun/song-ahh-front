import { MusicInfo } from '@/helpers/types';

export default function ArtistCard(musicInfo: MusicInfo) {
    return (
        <div>
            {musicInfo.artist ?
                <div className="w-fit flex flex-col items-center mr-10">
                    <div className="bg-stone-600 rounded-full h-52 w-52"></div>
                    <span className="text-white font-bold text-2xl mt-2">{`${musicInfo.artist}`}</span>
                </div>
                :
                <div className="w-fit flex flex-col items-center mr-10">
                    <div className="bg-stone-600 rounded-full h-52 w-52"></div>
                    <div className="bg-stone-600 rounded-lg h-6 w-3/4 mt-4"></div>
                </div>
            }
        </div>
    )
}