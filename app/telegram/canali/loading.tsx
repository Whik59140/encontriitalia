export default function LoadingCanaliIndex() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="prose lg:prose-xl dark:prose-invert max-w-none animate-pulse">
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-10"></div>

        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-6"></div>

        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-6 mt-12"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
} 