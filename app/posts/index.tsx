import { GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';

export interface PostListPageProps {
    posts: any[];
}

export default function PostListPage({ posts }: PostListPageProps) {
    console.log('posts', posts);
    return (
        <div>
            <h1>Post List Page</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
    context: GetStaticPropsContext
) => {
    console.log('static props');
    const response = await fetch('https://api.example.com/posts'); // Thay URL bằng URL thật của API
    const data = await response.json();
    console.log(data);

    return {
        props: {
            posts: data.data.map((x: any) => ({ id: x.id, title: x.title })),
        },
    };
};
