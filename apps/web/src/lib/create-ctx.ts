import React, { Context } from 'react';

type CreateCtx<T> = readonly [() => T, Context<T>];

const createCtx = <T>(name: string, defaultValue?: T | undefined) => {
  const ctx = React.createContext<T | undefined>(defaultValue);

  if (process.env.NODE_ENV === 'development') {
    ctx.displayName = name;
  }

  const useCtx = (): T => {
    const c = React.useContext(ctx);

    if (c === undefined) {
      throw new Error(`useCtx must be inside a ${name} Provider with a value`);
    }

    return c;
  };

  return [useCtx, ctx] as CreateCtx<T>;
};

export default createCtx;
