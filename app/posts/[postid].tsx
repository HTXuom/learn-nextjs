import * as React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

export interface PostPageProps {
  post: { id: string; title: string };
}

export default function PostDetailPage(props: PostPageProps) {
  const { post } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Post Detail Page</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
      <h2>{post.title}</h2>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('Get static paths');
  return {
    paths: [
      { params: { postId: '1' } },
      { params: { postId: '2' } },
      { params: { postId: '3' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context: GetStaticPropsContext
) => {
  console.log('Get static Props', context.params?.postId);
  const postId = context.params?.postId;
  const response = await fetch(`https://api.example.com/posts/${postId}`); // Thay URL bằng URL thật của API
  const data = await response.json();
  console.log(data);

  return {
    props: {
      post: { id: data.id, title: data.title },
    },
  };
};
