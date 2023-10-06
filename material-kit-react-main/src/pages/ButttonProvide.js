// ButtonContext.js

import React, { createContext, useContext, useState } from 'react';

// Create a context
const ButtonContext = createContext();

// Create a Context Provider component
export function ButtonProvider({ children }) {
  // Define the state or values you want to provide
  const [status, setStatus] = useState('');

  // You can provide other functions or values as well

  return (
    <ButtonContext.Provider value={{ status, setStatus }}>
      {children}
    </ButtonContext.Provider>
  );
}

// Create a custom hook to use the context
export function useButtonContext() {
  return useContext(ButtonContext);
}
