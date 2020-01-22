import React, { useEffect, useRef, useState } from 'react';
import LifeFunction from './components/LifeFunction/LifeFunction';
import { lifeFunctionMeta, lifeTime } from './metadata/lifeFunctionMeta';

import './App.css';


const App: React.FC = () => {
  const [health, setHealth] = useState<number>(10);

  const healthRef = useRef(health);
  healthRef.current = health;

  useEffect(() => {
    const lifeTimer = setTimeout(() => {
      // console.log('My time has gone.');
      setHealth(0);
    }, lifeTime);

    return () => {
      clearTimeout(lifeTimer);
    }
  }, []);

  return (
    <div className="App">
      <p>{`HEALTH INDEX: ${health}`}</p>
      <ul>
        <LifeFunction
          {...lifeFunctionMeta.hunger}
          cycle={health > 0 ? lifeFunctionMeta.hunger.cycle : 0}
          actionHandler={() => setHealth(healthRef.current + 1)}
          onUnhappy={() => setHealth(healthRef.current - 1)}
        />
        <LifeFunction
          {...lifeFunctionMeta.sleep}
          cycle={health > 0 ? lifeFunctionMeta.sleep.cycle : 0}
          onUnhappy={() => {}}
        />
        <LifeFunction
          {...lifeFunctionMeta.poop}
          cycle={health > 0 ? lifeFunctionMeta.poop.cycle : 0}
          onUnhappy={() => {}}
        />
      </ul>
    </div>
  );
}

export default App;
