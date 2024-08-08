import { useContext } from 'react';
import ThemeContext from '../context/theme';

const useTheme = () => useContext(ThemeContext);

export default useTheme;
