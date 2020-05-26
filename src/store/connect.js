import React, { createContext, useContext, } from 'react';

export const Context = createContext({});

export function connect(mapStateToProps, mapDispatchToProps) {
  return (Component) => {
    return (props) => {
      const [state, dispatch] = useContext(Context);
      const stateToProps = mapStateToProps(state);
      const dispatchToProps = mapDispatchToProps(dispatch);
      const newProps = { ...props, ...stateToProps, ...dispatchToProps };
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...newProps} />;
    };
  };
}

export function useSelector(stateToProp) {
  const [state] = useContext(Context);
  return stateToProp(state);
}

export function useAction(action) {
  const context = useContext(Context);
  return (...args) => action(context, ...args);
}
