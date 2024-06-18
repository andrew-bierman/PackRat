import React, { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Text } from 'tamagui';

interface Props {
  children?: ReactNode;
  FallbackComponent?: React.ComponentType<{ error: Error, resetErrorBoundary: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

const DefaultFallbackComponent = ({ error }: { error: Error }) => (
  <Text>Something went wrong.</Text>
);

const ErrorBoundary: React.FC<Props> = ({
  children,
  FallbackComponent = DefaultFallbackComponent,
  onError = (error, errorInfo) => console.error('Uncaught error:', error, errorInfo),
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export { ErrorBoundary };
