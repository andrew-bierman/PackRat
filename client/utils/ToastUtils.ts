import { Toast } from 'native-base';

/**
 * Show a toast message to inform the user.
 *
 * @function InformUser
 * @param {Object} options - The options object for the toast message.
 * @param {string} options.title - The title of the toast message.
 * @param {string} [options.placement="top"] - The placement of the toast message. Possible values are "top", "bottom", "left", or "right".
 * @param {number} [options.duration=2000] - The duration in milliseconds for which the toast message should be displayed.
 * @param {Object} [options.style={backgroundColor: 'green'}] - The style object for the toast message.
 * @returns {void}
 *
 * @example
 * // Show a toast message with default options
 * InformUser({ title: "Hello, world!" });
 *
 * // Show a toast message with custom options
 * InformUser({ title: "Custom Toast", placement: "bottom", duration: 3000 });
 */
export const InformUser = ({ title, placement, duration, style }) => {
  Toast.show({
    title,
    placement,
    duration,
    style,
  });
};
