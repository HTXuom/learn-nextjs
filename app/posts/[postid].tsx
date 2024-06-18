import * as React from 'react';
import {useRouter} from 'next/dist/client/router'
export interface PostDetailPageProps {
}

export default function PostDetailPage(props: PostDetailPageProps) {

    const router = useRouter()
  return (
      <div>
          <h1>Post List Page </h1>
          <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
}
