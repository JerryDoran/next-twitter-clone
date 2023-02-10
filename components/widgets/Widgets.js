import { SearchIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import News from './News';

export default function Widgets({ newsResults, randomUsersResults }) {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNum, setRandomUserNum] = useState(3);
  
  return (
    <div className='xl:w-[600px] hidden lg:inline ml-8 space-y-5'>
      <div className='w-[90%] xl:w-[75%] sticky top-0 bg-white dark:bg-black py-1.5 z-50'>
        <div className='flex items-center p-3 rounded-full relative '>
          <SearchIcon className='h-5 z-50 text-gray-400' />
          <input
            className='absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-400 focus:shadow-lg focus:ring-0 dark:bg-black'
            type='text'
            placeholder='Search Twitter'
          />
        </div>
      </div>
      <div className='text-gray-700 space-y-3 bg-gray-50 dark:bg-transparent dark:bg-gray-800 dark:text-gray-300 rounded-xl pt-4 pb-2 w-[90%] xl:w-[75%]'>
        <h4 className='font-bold text-xl px-4 tracking-wide mb-2'>
          What's happening
        </h4>
        {newsResults.slice(0, articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className='text-blue-300 pl-4 pb-3 hover:text-blue-400 transition'
        >
          Show More
        </button>
      </div>
      <div className='text-gray-700 space-y-3 bg-gray-50 dark:bg-transparent dark:bg-gray-800 dark:text-gray-300 rounded-xl pt-4 pb-2 w-[90%] xl:w-[75%]'>
        <h4 className='font-bold tracking-wide text-xl px-4'>Who to Follow</h4>
        {randomUsersResults.slice(0, randomUserNum).map((randomUser) => (
          <div
            key={randomUser.login.username}
            className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-100'
          >
            <img
              width='40'
              className='rounded-full'
              src={randomUser.picture.thumbnail}
              alt='random-user'
            />
            <div className='truncate ml-4 leading-5'>
              <h4 className='font-bold hover:underline text-[14px] truncate'>
                {randomUser.login.username}
              </h4>
              <h5 className='text-[13px] text-gray-400 truncate'>
                {randomUser.name.first + ' ' + randomUser.name.last}
              </h5>
            </div>
            <button className='ml-auto bg-black dark:border border-gray-400 text-white rounded-full text-xs tracking-wide px-3.5 py-1.5 font-bold'>
              Follow
            </button>
          </div>
        ))}
        <button
          className='text-blue-300 pl-4 pb-3 hover:text-blue-400 transition'
          onClick={() => setRandomUserNum(randomUserNum + 3)}
        >
          Show More
        </button>
      </div>
    </div>
  );
}
