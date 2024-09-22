import { type ReactNode } from 'react';
import { type Shape } from '../../model';

export interface MapButtonsOverlayProps {
  children: ReactNode;
  currentBounds?: any;
  shape?: Shape;
}
