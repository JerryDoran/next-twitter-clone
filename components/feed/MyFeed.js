import { SparklesIcon } from '@heroicons/react/outline';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { db } from '../../firebase.config';
import Input from './Input';
import Post from './Post';

export default function MyFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <div className='xl:ml-[370px] dark:border-gray-700  border-gray-200 border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
      <div className='flex justify-between items-center py-3 px-5 sticky top-0 z-50 bg-white border-b dark:border-gray-700 dark:bg-black'>
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer '>Home</h2>
        <div className='cursor-pointer hover:bg-gray-800 w-10 h-10 flex items-center justify-center rounded-full'>
          <SparklesIcon className='h-5 ' />
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Post post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
