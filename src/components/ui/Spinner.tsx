interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner = ({
  size = 20,
  className = "",
}: SpinnerProps) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      style={{
        width: size,
        height: size,
      }}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;