export default function DashboardSkeleton() {
    return (
        <div className="space-y-12 animate-pulse">
            {/* Hero Skeleton */}
            <div className="relative rounded-3xl overflow-hidden bg-surface/50 p-12 h-80 border border-border">
                <div className="h-8 w-48 bg-surface-hover rounded-full mb-6"></div>
                <div className="h-12 w-3/4 bg-surface-hover rounded-lg mb-4"></div>
                <div className="h-6 w-1/2 bg-surface-hover rounded-lg mb-8"></div>
                <div className="flex gap-4">
                    <div className="h-12 w-40 bg-surface-hover rounded-lg"></div>
                    <div className="h-12 w-40 bg-surface-hover rounded-lg"></div>
                </div>
            </div>

            {/* Skills Skeleton */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="h-8 w-32 bg-surface/50 rounded-lg"></div>
                    <div className="h-8 w-24 bg-surface/50 rounded-lg"></div>
                </div>
                <div className="flex gap-6 overflow-hidden">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="min-w-[200px] h-32 bg-surface/50 rounded-2xl border border-border"></div>
                    ))}
                </div>
            </div>

            {/* Jobs Skeleton */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="h-8 w-48 bg-surface/50 rounded-lg"></div>
                    <div className="h-8 w-24 bg-surface/50 rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-surface/50 rounded-2xl border border-border"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
