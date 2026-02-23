import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <Link
      href={`/detail/${post.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      <div className="p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-3">
          {post.body}
        </p>
        <div className="mt-3 sm:mt-4 flex items-center text-blue-600 text-xs sm:text-sm font-medium">
          Read more
        </div>
      </div>
    </Link>
  );
}
