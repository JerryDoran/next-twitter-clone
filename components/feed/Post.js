import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import Moment from 'react-moment';

export default function Post({ post }) {
  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200 dark:border-gray-700'>
      <img
        src={post?.data()?.userImg}
        className='rounded-full h-11 mr-4'
        alt='user-image'
      />
      {/* RIGHT SIDE */}
      <div className=''>
        {/* HEADER */}
        <div className='flex items-center justify-between mb-2'>
          {/* POST USER INFO */}
          <div className='flex items-center space-x-2 whitespace-nowrap'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
              {post?.data()?.name}
            </h4>
            <span className='text-sm sm:text-[15px] text-gray-500 dark:text-gray-400'>
              @{post?.data()?.username} -{' '}
            </span>
            <span className='text-sm sm:text-[15px] text-gray-500 dark:text-gray-400 hover:underline'>
              <Moment fromNow>{post?.data()?.timestamp.toDate()}</Moment>
            </span>
          </div>
          <DotsHorizontalIcon className='h-8 w-8 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-1' />
        </div>

        {/* POST TEXT */}
        <p className='text-[15px] sm:text-[16px] mb-2'>{post?.data()?.text}</p>

        {/* POST IMAGE */}
        <Image
          src={post?.data()?.image}
          width={600}
          height={400}
          alt='post-image'
          objectFit='cover'
          className='rounded-2xl mr-2'
        />

        {/* ICONS */}
        <div className='flex justify-between text-gray-500 p-2'>
          <div>
            <ChatIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
          </div>
          <TrashIcon className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100' />
          <div>
            <HeartIcon className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100' />
          </div>

          <ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
          <ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
        </div>
      </div>
    </div>
  );
}
