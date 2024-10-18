import Image from 'next/image'
import logo from '@/public/static/images/song-ahh-simple.svg'

export default function Header() {
    return(
        <header className="w-full h-[9vh] bg-black">
            <div className='h-full flex flex-row items-center'>
                <div className='py-4 pl-3 pr-1 h-full'>
                    <Image src={logo} alt='' width={1} height={1} style={{objectFit: 'contain', width: "auto", height: '100%'}}></Image>
                </div>
                <span className='font-pretendard font-bold text-white'>SONG AHH</span>
            </div>
        </header>
    )
}