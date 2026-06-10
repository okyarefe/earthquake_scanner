interface ErrorStateProps {
  message: string;
}

const ErrorState = ({ message }: ErrorStateProps) => (
  <p role="alert" className="text-sm text-destructive">
    Error: {message}
  </p>
);

export default ErrorState;
