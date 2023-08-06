import { createContext, useContext, useState } from "react";

export const RegisterContext = createContext();

export const useRegisterContext = () => useContext(RegisterContext);

export function RegisterProvider({children}) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [registerData, setRegisterData] = useState({});
  return (
    <RegisterContext.Provider value={{activeStepIndex, setActiveStepIndex, registerData, setRegisterData}}>
      {children}
    </RegisterContext.Provider>
  )
}