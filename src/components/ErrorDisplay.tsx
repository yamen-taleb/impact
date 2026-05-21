import {cn} from "../lib/utils.ts";

interface ErrorDisplayProps {
  message: string;
  className?: string;
}

const ErrorDisplay = ({ message, className }: ErrorDisplayProps) => {
  return (
    <p className={cn("rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600", className)}>
      {message}
    </p>
  );
};

export default ErrorDisplay;

