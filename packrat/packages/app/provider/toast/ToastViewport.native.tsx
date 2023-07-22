import { ToastViewport as ToastViewportOg } from '@my/ui'
import { useSafeAreaInsets } from 'app/utils/useSafeAreaInsets'

export const ToastViewport = () => {
  const { top, right, left } = useSafeAreaInsets()
  return <ToastViewportOg top={top + 5} left={left + 5} right={right + 5} />
}
