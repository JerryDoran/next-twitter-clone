import { useRouter } from 'next/router';
import Head from 'next/head';
import Sidebar from '../../components/sidebar/Sidebar';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Widgets from '../../components/widgets/Widgets';
import CommentModal from '../../components/modal/CommentModal';
import Post from '../../components/feed/Post';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import Comment from '../../components/comment/Comment';

export default function PostPage({ newsResults, randomUsersResults }) {
  const [mounted, setMounted] = useState(false);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  useEffect(() => {
    return onSnapshot(doc(db, 'posts', id), (snapshot) => setPost(snapshot));
  }, [db, id]);

  // if (!mounted) return null;

  // Get comments of a post
  useEffect(() => {
    const colRef = collection(db, 'posts', id, 'comments');
    return onSnapshot(query(colRef, orderBy('timestamp', 'desc')), (snapshot) =>
      setComments(snapshot.docs)
    );
  }, [db, id]);

  return (
    <div className='dark:bg-black dark:text-gray-300 text-gray-800 bg-white h-screen overflow-auto relative'>
      <Head>
        <title>Post Page</title>
        <meta name='description' content='A Twitter Clone Demo App' />
      </Head>
      <main className='flex min-h-screen mx-auto '>
        <Sidebar theme={theme} setTheme={setTheme} />
        <div className='xl:ml-[370px] dark:border-gray-700  border-gray-200 border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-2xl'>
          <div className='flex items-center space-x-2 py-3 px-5 sticky top-0 z-50 bg-white border-b dark:border-gray-700 dark:bg-black'>
            <div
              className='hoverEffect flex items-center justify-center'
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon className='h-5 cursor-pointer' />
            </div>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer '>
              Tweet
            </h2>
          </div>
          <Post id={id} post={post} />
          {comments.length > 0 &&
            comments.map((comment) => (
              <Comment
                key={comment.id}
                commentId={comment.id}
                originalPostId={id}
                comment={comment.data()}
              />
            ))}
        </div>
        <Widgets
          newsResults={newsResults.articles}
          randomUsersResults={randomUsersResults.results}
        />
        <CommentModal />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  // news section
  const newsResponse = await fetch(
    'https://saurav.tech/NewsAPI/top-headlines/category/business/us.json'
  );
  const newsResults = await newsResponse.json();

  // who to follow section
  const followResponse = await fetch(
    'http://randomuser.me/api/?results=30&inc=name,login,picture'
  );

  const randomUsersResults = await followResponse.json();

  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
}
