import { useMediaQuery } from 'react-responsive';

/**
 * A function that renders the provided 'children' component only if the device is a desktop.
 *
 * @param {object} children - The component(s) to be rendered if the device is a desktop.
 * @return {React.Element|null} The 'children' component if the device is a desktop, otherwise null.
 */
export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
/**
 * Generates a function comment for the given function body.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The children of the Tablet component.
 * @return {ReactNode} The children if the device is a tablet, otherwise null.
 */
export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
/**
 * Generate a function comment for the given function body.
 *
 * @param {object} props - The props object containing the children.
 * @return {ReactElement | null} - The children if isMobile is true, otherwise null.
 */
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
/**
 * Generate the function comment for the given function body.
 *
 * @param {object} props - The props object.
 * @param {ReactNode} props.children - The children of the component.
 * @return {ReactNode} The rendered component.
 */
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};
