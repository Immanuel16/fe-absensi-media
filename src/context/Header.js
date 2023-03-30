import React, { createContext, useContext, useState } from 'react';

export const HeaderContext = createContext();

export const useHeader = () => useContext(HeaderContext);

export default function HeaderProvider({children}) {
  const [titleHeader, setTitleHeader] = useState('');

  return (
    <HeaderContext.Provider
      value={{
        titleHeader, setTitleHeader
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
