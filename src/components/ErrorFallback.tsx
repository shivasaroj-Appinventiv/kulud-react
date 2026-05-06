type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorFallback;
