import { RSkeleton } from '@packrat/ui';
import { ErrorCard } from 'app/components/ErrorCard';
import { type ErrorCardProps } from 'app/components/ErrorCard/ErrorCard';
import React, { type ReactNode, type FC } from 'react';

interface AsyncViewProps {
  isLoading: boolean;
  isError: boolean;
  loadingComponentProps?: { style: any };
  errorComponentProps?: ErrorCardProps;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  children: ReactNode;
}

export const AsyncView: FC<AsyncViewProps> = ({
  isLoading,
  isError,
  children,
  loadingComponentProps = { style: { width: '100%', height: 30 } },
  errorComponentProps,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
}) => {
  if (isLoading) {
    return <>{LoadingComponent || <RSkeleton {...loadingComponentProps} />}</>;
  }

  if (isError) {
    if (!errorComponentProps) return null;
    return <>{ErrorComponent || <ErrorCard {...errorComponentProps} />}</>;
  }

  return <>{children}</>;
};
