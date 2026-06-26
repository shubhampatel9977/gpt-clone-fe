type SkeletonVariant = "text" | "rect" | "circle";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  count?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const {
    variant = "text",
    width,
    height,
    count = 1,
    className,
    ...rest
  } = props;

  // Determine the shape of the skeleton based on the variant
  const shapeClasses = variant === "circle" ? "rounded-full" : "rounded-lg";

  // Combine base styles for skeleton
  const containerClasses = `bg-lightGray animate-pulse ${shapeClasses} ${className}`;

  // Inline styles for dynamic width and height
  const getInlineStyle = (): React.CSSProperties => ({
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  });

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index + 1}`}
          className={containerClasses}
          style={getInlineStyle()}
          {...rest}
        />
      ))}
    </>
  );
};

export default Skeleton;
