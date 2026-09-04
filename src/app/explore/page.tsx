import { Suspense } from 'react';
import ExploreContent from './ExploreContent';
import { Skeleton } from '@/components/ui/Skeleton';

function ExploreFallback() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="pt-28 pb-8 px-4 sm:px-6 bg-navy">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-12 w-56 mb-3" variant="text" />
          <Skeleton className="h-6 w-96 max-w-full mb-8" />
          <Skeleton className="h-16 w-full max-w-4xl rounded-3xl bg-navy/40" />
        </div>
      </div>
      <div className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 shrink-0 rounded-full" />
          ))}
        </div>
      </div>
      <div className="px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/3] rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<ExploreFallback />}>
      <ExploreContent />
    </Suspense>
  );
}