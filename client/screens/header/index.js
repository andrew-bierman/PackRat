import Navigation from '../Navigation';
import ProgressBarComponent from '~/components/progress';

export default function Header() {
  return (
    <>
      <Navigation />
      {/* Progress bar is causing some console errors */}
      {/* <ProgressBarComponent /> */}
    </>
  );
}
