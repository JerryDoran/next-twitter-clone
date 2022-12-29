import Head from 'next/head';
import MyFeed from '../components/feed/MyFeed';
import Sidebar from '../components/sidebar/Sidebar';

export default function HomePage() {
  return (
    <div>
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
