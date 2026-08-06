import React from 'react';

interface PackageCardSkeletonProps {
  count?: number;
}

export const PackageCardSkeleton: React.FC<PackageCardSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-md flex flex-col justify-between animate-pulse"
          >
            <div>
              {/* Image Banner Skeleton */}
              <div className="relative h-52 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer overflow-hidden">
                <div className="absolute top-4 left-4 h-6 w-24 bg-gray-300/80 rounded-full" />
                <div className="absolute top-4 right-4 h-6 w-20 bg-gray-300/80 rounded-full" />
              </div>

              {/* Body Details Skeleton */}
              <div className="p-6">
                {/* Title */}
                <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4" />

                {/* Rating & Review Box Skeleton */}
                <div className="p-3.5 bg-gray-50 rounded-[20px] border border-gray-100 mb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                    <div className="h-4 w-16 bg-gray-200 rounded-full" />
                  </div>
                  <div className="h-3 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-2/3 bg-gray-200 rounded" />
                </div>

                {/* Highlights / Inclusions Skeleton */}
                <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-[20px] border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full shrink-0" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full shrink-0" />
                    <div className="h-3 bg-gray-200 rounded w-4/6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full shrink-0" />
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>

                {/* Tags / Features */}
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-20 bg-gray-200 rounded-md" />
                  <div className="h-6 w-24 bg-gray-200 rounded-md" />
                </div>
              </div>
            </div>

            {/* Price Footer Skeleton */}
            <div className="p-6 pt-0 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between mt-auto">
              <div>
                <div className="h-3 w-16 bg-gray-200 rounded mb-1" />
                <div className="h-7 w-32 bg-gray-300 rounded-lg" />
              </div>
              <div className="h-10 w-28 bg-gray-300 rounded-[18px]" />
            </div>
          </div>
        ))}
    </div>
  );
};
