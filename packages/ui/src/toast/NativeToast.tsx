import {
  Toast as OriginalToast,
  useToastState,
  ToastProps,
} from '@tamagui/toast';
import { YStack } from 'tamagui';

interface ExtendedToastProps extends ToastProps {
  opacity?: number;
}

const Toast: React.FC<ExtendedToastProps> = ({ opacity, ...props }) => {
  const style = { ...(props.style as any), opacity };
  return <OriginalToast {...props} style={style} />;
};

export const NativeToast = (): React.ReactNode => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) {
    return null;
  }

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 } as any}
      exitStyle={{ opacity: 0, scale: 1, y: -20 } as any}
      y={0}
      opacity={1}
      scale={1}
      animation="quick"
    >
      <YStack>
        <OriginalToast.Title>{currentToast.title}</OriginalToast.Title>
        {!!currentToast.message && (
          <OriginalToast.Description>
            {currentToast.message}
          </OriginalToast.Description>
        )}
      </YStack>
    </Toast>
  );
};
