/**
 * @file UseInterval.js
 * Projekt: Implementace webové aplikace Team manager.
 *
 * @author Dan Abramov
 * @availible https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @year 2019
 * @brief Hook for calling a function periodically taken from a blog.
 */

import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
