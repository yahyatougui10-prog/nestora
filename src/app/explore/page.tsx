import { Suspense } from 'react';
import ExploreContent from './ExploreContent';

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}