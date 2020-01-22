import React, { useEffect, useRef, useState } from 'react';
import { timestamp } from '../../utils/time';
import Action from '../Action/Action';

interface LifeFunctionProps {
    name: string,
    verb: string,
    pastVerb: string,
    cycle: number,
    automatic: boolean,
    actionHandler?: () => void,
    onUnhappy: () => void
};

const LifeFunction: React.FC<LifeFunctionProps> = ({
  name,
  verb,
  pastVerb,
  cycle,
  automatic,
  actionHandler,
  onUnhappy,
}) => {
  const [status, setStatus] = useState<string>('Happy!');

  const callBackRef = useRef(onUnhappy);
  useEffect(() => {callBackRef.current = onUnhappy}, [onUnhappy])

  useEffect(() => {
    function handleTimer() {
      setStatus(automatic ? `${pastVerb} at ${timestamp()}` : `need to ${verb}!`);
      callBackRef.current();
    }

    if (cycle !== 0) {
      const timerId = setInterval(handleTimer, cycle);
      return () => clearInterval(timerId);
    }
  }, [cycle, actionHandler, automatic, name, verb, pastVerb]);

  const onAction = () => {
    setStatus(`${pastVerb} at ${timestamp()}`);
    if (actionHandler) {
      actionHandler();
    }
  };

  return <li key={Math.random().toString()}>
      {`${name.toUpperCase()}: `}{`${status}`}
      <Action
          name={verb}
          disable={cycle <= 0 ? true : false}
          onAction={onAction}
      />
    </li>;
};

export default LifeFunction;