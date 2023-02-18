import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import Image from 'next/image';
import Moment from 'react-moment';
import { db, storage } from '../../firebase.config';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';

export default function Post({ post }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'posts', post.id, 'likes'),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', post.id, 'likes', session?.user.uid));
      } else {
        await setDoc(doc(db, 'posts', post.id, 'likes', session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  }

  async function deletePost() {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteDoc(doc(db, 'posts', post.id));
      await deleteObject(ref(storage, `posts/${post.id}/images`));
    }
  }

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
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
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
          {session?.user.uid === post?.data().id && (
            <TrashIcon
              onClick={deletePost}
              className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
            />
          )}

          <div className='flex items-center'>
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className='h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100'
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && 'text-red-600'} text-sm select-none`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
          <ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
        </div>
      </div>
    </div>
  );
}
