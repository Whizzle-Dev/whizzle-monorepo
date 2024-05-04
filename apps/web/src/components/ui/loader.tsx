import { Loader as LucideReactLoader } from 'lucide-react';

export const Loader = () => {
  return <LucideReactLoader />;
};

export const LoadingShimmer = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 mt-10 max-w-sm w-full mx-auto">
      <div className=" flex space-x-4 animate-pulse ">
        <div className="rounded-full  bg-slate-500 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-600 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-600 rounded col-span-2"></div>
              <div className="h-2 bg-slate-600 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TimeTrackingLoadingShimmer = () => {
  return (
    <div className="max-w-sm w-full mx-auto">
      <div className="flex space-x-4 animate-pulse h-9 ">
        <div className="h-full bg-gray-300 rounded w-24"></div>
        <div className="h-full bg-gray-300 rounded w-32"></div>
        <div className="h-full bg-gray-300 rounded w-10"></div>
      </div>
    </div>
  );
};
