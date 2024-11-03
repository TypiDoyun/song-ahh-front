"use client"

import Image from 'next/image'
import logo from '@/public/static/images/song-ahh-simple.svg'
import * as React from 'react';
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import styled from "styled-components"  

const InputTextField = styled(TextField)({
  '& label': {
    color: '#969696'
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& label.Mui-error': {
    color: '#d32f2f',
  },
  '& .MuiOutlinedInput-root': { 
    color: 'white',
    '& fieldset': {
      borderColor: '#969696',
    },
    '&:hover fieldset': {
    borderColor: "white"
    },
    '&.Mui-focused fieldset': {
      borderColor: "white"
    }
  },
}); 

export default function Header() {
  const musicNameList = ["응디", "노무현", "필재의 전설", "팡이 던지기: 붕가붕가의 역습", "레오탕 조리법", "응디를 부딱 흔들어"]
  return (  
    <header className="w-full h-[9vh] bg-black fixed top-0 flex flex-row items-center justify-between border-b-[2px] border-[#404040] z-50">
      <div className='h-full flex flex-row items-center'>
        <div className='py-4 pl-3 pr-1 h-full'>
          <Image src={logo} alt='' width={1} height={1} style={{ objectFit: 'contain', width: "auto", height: '100%', borderRadius: "9999px"}}></Image>
        </div>
        <span className='font-pretendard font-bold text-white'>SONG AHH</span>
      </div>
      <div className='w-[20%] pr-3 my-5 h-auto'>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          color="white"
          options={musicNameList}
          className="h-auto"
          renderInput={(params) => (  
            <InputTextField
              {...params}
              label="Search"
              size="small"
              slotProps={{
                input: {
                  ...params.InputProps,
                  type: 'search',
                },
              }}
            />  
          )}
        />
      </div>
    </header>
  )
}