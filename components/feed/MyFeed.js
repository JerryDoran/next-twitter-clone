import { SparklesIcon } from '@heroicons/react/outline';
import Input from './Input';
import Post from './Post';

export default function MyFeed() {
  const posts = [
    {
      id: '1',
      name: 'Mario',
      username: 'plumber101',
      userImg: 'https://avatarfiles.alphacoders.com/295/thumb-295023.jpg',
      img: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3VucmlzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      text: 'nice view!',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      name: 'Mario',
      username: 'plumber101',
      userImg: 'https://avatarfiles.alphacoders.com/295/thumb-295023.jpg',
      img: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHN1bnJpc2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      text: 'wow what a nice pictures',
      timestamp: '1 day ago',
    },
  ];
  return (
    <div className='xl:ml-[370px] border-gray-300 border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
      <div className='flex justify-between items-center py-3 px-5 sticky top-0 z-50 border-b border-gray-700'>
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer '>Home</h2>
        <div className='cursor-pointer hover:bg-gray-800 w-10 h-10 flex items-center justify-center rounded-full'>
          <SparklesIcon className='h-5 ' />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
