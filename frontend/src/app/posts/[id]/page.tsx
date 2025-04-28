'use client';

import { useQuery } from '@tanstack/react-query';
import { posts } from '@/lib/api';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { use } from 'react';

export default function PostPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const unwrappedParams = use(params);
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', unwrappedParams.id],
    queryFn: () => posts.getOne(unwrappedParams.id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center bg-white rounded-xl shadow-lg p-8">
          <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/posts"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  const canEdit = user?.role === 'admin';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex items-center text-gray-600 mb-6">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{post.title}</h1>
          <div className="prose max-w-none text-gray-600 leading-relaxed">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </div>
        {canEdit && (
          <div className="px-8 md:px-12 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end space-x-4">
              <Link
                href={`/posts/${post.id}/edit`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Post
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8">
        <Link
          href="/posts"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Posts
        </Link>
      </div>
    </div>
  );
} 