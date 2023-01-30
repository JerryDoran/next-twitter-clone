import Head from 'next/head';
import MyFeed from '../components/feed/MyFeed';
import Sidebar from '../components/sidebar/Sidebar';

export default function HomePage() {
  return (
    <div className='dark:bg-black dark:text-gray-300 text-gray-800 bg-gray-100 h-screen relative'>
      <Head>
        <title>Twitter Clone</title>
        <meta name='description' content='A Twitter Clone Demo App' />
      </Head>
      <main className='flex min-h-screen max-w-7xl mx-auto '>
        <Sidebar />
        <MyFeed />
      </main>
    </div>
  );
}
