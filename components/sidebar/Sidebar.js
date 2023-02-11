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
import { useSession, signIn, signOut } from 'next-auth/react';

import { MoonIcon, SunIcon } from '@heroicons/react/solid';

export default function Sidebar({ theme, setTheme }) {
  const { data: session } = useSession();

  return (
    <div className='p-3 hidden sm:flex flex-col xl:items-start fixed h-full xl:ml-24'>
      <div className='hoverEffect p-0 hover:bg-blue-100 xl:px-1 xl:pt-1 flex items-center justify-center'>
        <Image
          src='https://help.twitter.com/content/dam/help-twitter/brand/logo.png'
          width={50}
          height={50}
        />
      </div>
      <div className='mt-4 mb-3 lg:items-start'>
        <SidebarMenuItem
          text='Home'
          Icon={HomeIcon}
          active
          className='h-7 dark:text-gray-400 text-gray-700'
        />
        <SidebarMenuItem
          text='Explore'
          Icon={HashtagIcon}
          className='h-7 dark:text-gray-400 text-gray-700'
        />
        {session && (
          <>
            <SidebarMenuItem
              text='Notifications'
              Icon={BellIcon}
              className='h-7 dark:text-gray-400 text-gray-700'
            />
            <SidebarMenuItem
              text='Messages'
              Icon={InboxIcon}
              className='h-7 dark:text-gray-400 text-gray-700'
            />
            <SidebarMenuItem
              text='Bookmark'
              Icon={BookmarkIcon}
              className='h-7 dark:text-gray-400 text-gray-700'
            />
            <SidebarMenuItem
              text='Lists'
              Icon={ClipboardIcon}
              className='h-7 dark:text-gray-400 text-gray-700'
            />
            <SidebarMenuItem
              text='Profile'
              Icon={UserIcon}
              className='h-7 dark:text-gray-400 text-gray-700'
            />
            <SidebarMenuItem
              text='More'
              Icon={DotsCircleHorizontalIcon}
              className='h-7 dark:text-gray-400 text-gray-700'
            />
          </>
        )}
      </div>
      {session ? (
        <>
          <button className='bg-blue-400 rounded-full w-56 h-12 font-bold shadow-md text-lg transition hover:brightness-90 tracking-wider hidden xl:inline'>
            Tweet
          </button>
          <div className='absolute bottom-40 flex align-center'>
            {theme === 'dark' ? (
              <SidebarMenuItem
                text='Light Mode'
                Icon={SunIcon}
                className='w-7 h-7 text-yellow-500 transition  rounded '
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              />
            ) : (
              <SidebarMenuItem
                text='Dark Mode'
                Icon={MoonIcon}
                className='w-7 h-7 text-gray-800 transition rounded '
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              />
            )}
          </div>
          <div className=' text-gray-400 mt-auto mb-4 flex items-center justify-center xl:justify-start'>
            <img
              src={session.user.image}
              alt='user-image'
              className='h-10 w-10 rounded-full xl:mr-2 cursor-pointer'
              onClick={signOut}
            />
            <div className='leading-5 xl:inline hidden'>
              <h4 className='font-bold'>{session.user.name}</h4>
              <p className='text-gray-500'>@{session.user.username}</p>
            </div>
            <DotsHorizontalIcon className='cursor-pointer h-5 xl:ml-8 xl:inline hidden' />
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className='bg-blue-400 rounded-full w-36 h-12 font-bold shadow-md text-lg transition hover:brightness-90 tracking-wider hidden xl:inline'
        >
          Sign In
        </button>
      )}
    </div>
  );
}
