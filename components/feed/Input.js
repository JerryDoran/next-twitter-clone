import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline';

export default function Input() {
  return (
    <div className='flex border-b dark:border-gray-700 p-3 space-x-3'>
      <img
        src='https://avatarfiles.alphacoders.com/295/thumb-295023.jpg'
        alt='user-image'
        className='h-10 w-10 rounded-full cursor-pointer hover:brightness-95'
      />
      <div className='w-full divide-y dark:divide-gray-700'>
        <div className=''>
          <textarea
            rows='2'
            placeholder="What's happening?"
            className='bg-transparent w-full border-none focus:ring-0 placeholder-gray-500 tracking-wide min-h-[50px]'
          ></textarea>
        </div>
        <div className='flex items-center justify-between pt-2.5'>
          <div className='flex'>
            <PhotographIcon className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 hoverEffect' />
            <EmojiHappyIcon className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 hoverEffect' />
          </div>
          <button className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-50'>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
