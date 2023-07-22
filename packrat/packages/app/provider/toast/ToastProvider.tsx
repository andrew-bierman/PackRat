import { CustomToast, ToastProvider as ToastProviderOG } from '@my/ui'
import { ToastViewport } from './ToastViewport'

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProviderOG
      swipeDirection="up"
      swipeThreshold={20}
      duration={6000}
      native={
        [
          /* uncomment the next line to do native toasts on mobile - note that it won't be as customizable as custom toasts, especially on android */
          // 'mobile'
        ]
      }
    >
      {children}
      <ToastViewport />
      <CustomToast />
    </ToastProviderOG>
  )
}
