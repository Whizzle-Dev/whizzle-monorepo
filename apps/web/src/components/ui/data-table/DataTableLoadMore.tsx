import { Button } from '@/components/ui/button';
import React from 'react';

type DataTableLoadMoreProps = {
  totalCount?: number;
  loadedCount: number;
  onLoadMore: () => void;
  loadingMore: boolean;
  canLoadMore?: boolean;
};
export const DataTableLoadMore = ({
  totalCount,
  loadedCount,
  onLoadMore,
  loadingMore,
  canLoadMore,
}: DataTableLoadMoreProps) => {
  return (
    <div className="flex flex-row items-center gap-4 text-gray-500 text-sm">
      <span>
        Total count: <strong>{totalCount}</strong>
      </span>
      <span>
        Loaded: <strong>{loadedCount}</strong>
      </span>
      {canLoadMore && (
        <Button
          loading={loadingMore}
          onClick={() => {
            onLoadMore();
          }}
        >
          Load More
        </Button>
      )}
    </div>
  );
};
