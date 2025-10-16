import React from 'react'
import { SidebarItem } from './SidebarItem'
import { TwitterIcon } from '../icons/twitter'
import { YoutubeIcon } from '../icons/youtube'
import { BrainIcon } from '../icons/brain'

function Sidebar() {
  return (
    <div className='h-screen bg-white  w-72 fixed left-0 top-0'>
            <div className='flex items-center gap-3 py-8 px-7'>
                <BrainIcon/>
                <h1 className='text-3xl font-bold text-center '> Brainly </h1>
            </div>
             <div className='flex flex-col justify-center p-4'>
                  <SidebarItem icon={<TwitterIcon/>} text='Twitter' />
                  <SidebarItem icon={<YoutubeIcon/>} text='Youtube' />    
             </div>
    </div>
  )
}

export default Sidebar