interface LoadingStateProps {
  label?: string;
}

const LoadingState = ({ label = 'Loading…' }: LoadingStateProps) => (
  <p role="status" className="text-sm text-muted-foreground">
    {label}
  </p>
);

export default LoadingState;
