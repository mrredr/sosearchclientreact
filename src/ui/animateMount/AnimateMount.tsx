import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './animateMount.css';

const AnimateMount = ({ children }) => {
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setHidden(true)
    setTimeout(() => {
      setHidden(false);
    }, 0);
  }, [pathname])

  return (
    <>
      {!hidden && (
        <div style={{ animation: "inAnimation 500ms ease-in" }}>
          {children}
        </div>
      )}
    </>
  );
};

export default AnimateMount;
