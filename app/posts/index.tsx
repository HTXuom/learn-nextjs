import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from '../styles/Home.module.css';

const Home: NextPage = () => {
  const router = useRouter();

  function goToDetailPage() {
    router.push({
      pathname: '/posts/[postId]',
      query: {
        postId: 123,
        ref: 'social',
      },
    });
  }

  return (
    <div className={style.container}>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1>Welcome to the Home Page</h1>
      <button onClick={goToDetailPage}>Go to Detail Page</button>
    </div>
  );
};

export default Home;
