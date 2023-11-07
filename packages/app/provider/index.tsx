import { CombinedProvider } from './CombinedProvider';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <CombinedProvider>
      {children}
    </CombinedProvider>
  );
}
