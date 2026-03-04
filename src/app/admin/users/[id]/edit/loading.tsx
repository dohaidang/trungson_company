import { Loader2 } from "lucide-react";

export default function LoadingEditUser() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-between">
        <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-5">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse" />
        </div>
        <div className="flex justify-end pt-4">
          <div className="h-10 w-32 bg-primary/20 rounded-lg animate-pulse flex items-center justify-center">
             <Loader2 className="size-5 text-primary animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
}
