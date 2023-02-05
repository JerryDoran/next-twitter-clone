import Head from 'next/head';
import MyFeed from '../components/feed/MyFeed';
import Sidebar from '../components/sidebar/Sidebar';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Widgets from '../components/widgets/Widgets';

export default function HomePage({ newsResults, randomUsersResults }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='dark:bg-black dark:text-gray-300 text-gray-800 bg-white h-screen overflow-auto relative'>
      <Head>
        <title>Twitter Clone</title>
        <meta name='description' content='A Twitter Clone Demo App' />
      </Head>
      <main className='flex min-h-screen mx-auto '>
        <Sidebar theme={theme} setTheme={setTheme} />
        <MyFeed />
        <Widgets
          newsResults={newsResults.articles}
          randomUsersResults={randomUsersResults?.results}
        />
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
