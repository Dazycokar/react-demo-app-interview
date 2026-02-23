export default function CommentItem({ comment }) {
  return (
    <div className="border-b border-gray-200 pb-3 sm:pb-4 last:border-0">
      <p className="font-medium text-gray-900 text-sm sm:text-base">{comment.name}</p>
      <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{comment.email}</p>
      <p className="text-gray-700 text-sm sm:text-base">{comment.body}</p>
    </div>
  );
}
