import useLocalStorage from './useLocalStorage';
import { useEffect } from 'react';

function useColorMode() {
  const [colorMode, setColorMode] = useLocalStorage('color-mode', 'light');

  useEffect(() => {
    const className = 'dark';
    const bodyClasses = window.document.body.classList;

    colorMode === 'dark'
      ? bodyClasses.add(className)
      : bodyClasses.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
}

export default useColorMode;
