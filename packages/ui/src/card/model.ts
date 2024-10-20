import { type ReactNode } from 'react';

export type CardType = 'primary' | 'secondary';

export interface BaseCardProps {
  link: string;
  title: ReactNode;
  image: ReactNode;
  subtitle: ReactNode;
  content?: ReactNode;
  isFullWidth?: boolean;
  footer?: ReactNode;
  actions?: ReactNode;
  style?: any;
}
