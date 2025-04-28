'use client';

import { useQuery } from '@tanstack/react-query';
import { posts } from '@/lib/api';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function PostsPage() {
  const { user } = useAuth();
  const { data: postsList, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => posts.getAll(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Posts</h1>
          <p className="text-gray-600">Discover and read interesting articles</p>
        </div>
        {user?.role === 'admin' && (
          <Link
            href="/posts/new"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Post
          </Link>
        )}
      </div>
      <div className="grid gap-8">
        {postsList?.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <div className="p-8">
              <Link href={`/posts/${post.id}`}>
                <h2 className="text-2xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200 mb-4">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center text-gray-600 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{post.author.name}</span>
                </div>
                <span className="mx-3">•</span>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-gray-600 line-clamp-3 leading-relaxed">{post.content}</p>
              <Link 
                href={`/posts/${post.id}`}
                className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
        {postsList?.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.5-1.5L15 4.5a2 2 0 00-1.5-.5H5a2 2 0 00-2 2v12a2 2 0 002 2h14z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">
              {user?.role === 'admin' 
                ? "Be the first to create a post and share your thoughts!"
                : "Check back later for new posts."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 