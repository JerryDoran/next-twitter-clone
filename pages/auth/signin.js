import { getProviders } from 'next-auth/react';

export default function SignInPage({ providers }) {
  return (
    <div>
      <img src='/assets/twitter-bird.png' alt='twitter bird inside a phone' />
      <div className=''>
        {Object.values(providers).map((provider) => (
          <div className=''>
            <img
              src='https://help.twitter.com/content/dam/help-twitter/brand/logo.png'
              alt='twitter logo'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
