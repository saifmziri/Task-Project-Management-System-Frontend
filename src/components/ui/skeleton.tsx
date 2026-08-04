interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      className={`animate-shimmer rounded-md bg-slate-200/80 dark:bg-slate-700 ${className}`}
    />
  );
};

export default Skeleton;
