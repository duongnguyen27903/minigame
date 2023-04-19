import ReactPlayer from 'react-player';
import { SpeakerWaveIcon,SpeakerXMarkIcon, Bars3Icon } from '@heroicons/react/24/solid'
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';

import audiobg from 'F:/minigame/src/assets/video-bgm.d8637316.mp3'
import movingbg from 'F:/minigame/src/assets/3e78e80.mp4'
import { Menu } from '../layout/Menu';

const Start = () => {
	const [menu,setMenu] = useState(false)
	const [mute,setMute] = useState(false)
	const navigate = useNavigate();

	const Audio = () =>{
		return (
			mute === false ? 
			<SpeakerWaveIcon 
			className='h-12 w-12 fixed top-4 left-16 text-blue-500 cursor-pointer transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-red-500 duration-300'
			onClick={()=>{setMute(!mute)}}
			/> : <SpeakerXMarkIcon 
			className='h-12 w-12 fixed top-4 left-16 text-blue-500 cursor-pointer transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-red-500 duration-300'
			onClick={()=>{setMute(!mute)}}
			/>
		);	
	}
	
	useEffect(() => {
	  if( menu === true){
		setTimeout(()=>{setMenu(false)},15000)
	  }
	}, [menu])

	
	
	return (
		<div className='relative'>
			<ReactPlayer url={movingbg} playing={true} loop height='100%' width='100%' />
			<Audio />
			<ReactAudioPlayer src={audiobg} autoPlay={true} loop muted={mute} />
			{ menu === false && <Bars3Icon 
			className='h-12 w-12 fixed top-4 left-4 text-blue-500 cursor-pointer transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-red-500 duration-300' 
			onClick={()=>{setMenu(!menu)}}/>}
			{
				menu && <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/30 '>
					<ul className='fixed top-4 left-4 w-1/5 bg-white/80 rounded-lg'>
						{Menu.map((menu)=>{
							return (
								<li key={menu.name} className='flex flex-row place-items-center gap-5 m-5 cursor-pointer transition delay-100 hover:scale-125 hover:translate-x-10 hover:text-blue-500 duration-300'
									onClick={()=>{if(menu.name === "Home"){setMenu(!menu)}else navigate(menu.path)}}>
									<div className=''>{menu.icon}</div>
									<div className='text-xl'>{menu.name}</div>
								</li>
							);
						})}
					</ul>
				</div>
			}
		</div>
	);
}

export default Start