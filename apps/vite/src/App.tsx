import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import '@tamagui/core/reset.css';

import { RButton, YStack } from '@packrat/ui';
import { LinearGradient } from 'tamagui/linear-gradient';
import LandingPage from 'app/components/landing_page';
import {Provider} from 'app/provider'

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider>
      <LandingPage />
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
          <YStack f={1} ai="center" jc="center">
            <RButton>Hello world</RButton>
            <LinearGradient zIndex={-1} fullscreen colors={['red', 'blue']} />
          </YStack>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    </Provider>
  );
}

export default App;
