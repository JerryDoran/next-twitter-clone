import Image from 'next/image';
import SidebarMenuItem from './SidebarMenuItem';
import { HomeIcon } from '@heroicons/react/solid';
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline';

export default function Sidebar() {
  return (
    <div className='p-3 hidden sm:flex flex-col xl:items-start fixed h-full'>
      <div className='hoverEffect p-0 hover:bg-blue-100 xl:px-1 xl:pt-1'>
        <Image src='/assets/twitter.png' width={50} height={50} />
      </div>
      <div className='mt-4 mb-3 xl:items-start'>
        <SidebarMenuItem text='Home' Icon={HomeIcon} active />
        <SidebarMenuItem text='Explore' Icon={HashtagIcon} />
        <SidebarMenuItem text='Notifications' Icon={BellIcon} />
        <SidebarMenuItem text='Messages' Icon={InboxIcon} />
        <SidebarMenuItem text='Bookmark' Icon={BookmarkIcon} />
        <SidebarMenuItem text='Lists' Icon={ClipboardIcon} />
        <SidebarMenuItem text='Profile' Icon={UserIcon} />
        <SidebarMenuItem text='More' Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className='bg-blue-400 rounded-full w-56 h-12 font-bold shadow-md text-lg transition hover:brightness-90 tracking-wider hidden xl:inline'>
        Tweet
      </button>
      <div className='hoverEffect text-gray-400 mt-auto flex items-center justify-center xl:justify-start'>
        <img
          src='https://avatarfiles.alphacoders.com/295/thumb-295023.jpg'
          alt='user-image'
          className='h-10 w-10 rounded-full xl:mr-2'
        />
        <div className='leading-5 xl:inline hidden'>
          <h4 className='font-bold'>Mario</h4>
          <p className='text-gray-500'>@marioplumber</p>
        </div>
        <DotsHorizontalIcon className='h-5 xl:ml-8 xl:inline hidden' />
      </div>
    </div>
  );
}
