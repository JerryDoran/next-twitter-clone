import Head from 'next/head';
import MyFeed from '../components/feed/MyFeed';
import Sidebar from '../components/sidebar/Sidebar';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='dark:bg-black dark:text-gray-300 text-gray-800 bg-gray-100 h-screen relative'>
      <Head>
        <title>Twitter Clone</title>
        <meta name='description' content='A Twitter Clone Demo App' />
      </Head>
      <main className='flex min-h-screen max-w-7xl mx-auto '>
        <Sidebar theme={theme} setTheme={setTheme} />
        <MyFeed />
      </main>
    </div>
  );
}
