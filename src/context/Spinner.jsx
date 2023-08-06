import React, { createContext, useContext, useState } from "react";

export const SpinnerContext = createContext();

export const useSpinner = () => useContext(SpinnerContext);

export default function SpinnerProvider({ children }) {
  const [showSpinner, setShowSpinner] = useState(false);
  return (
    <SpinnerContext.Provider value={{ showSpinner, setShowSpinner }}>
      {children}
    </SpinnerContext.Provider>
  );
}
