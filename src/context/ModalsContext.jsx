import React, { createContext, useContext, useState } from "react";

export const ModalsContext = createContext();

export const useModals = () => useContext(ModalsContext);

export default function ModalsProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [config, setConfig] = useState({
    image: "",
    message: "",
    title: "",
    type: 1 /* 1: success; 0: error; */,
  });
  return (
    <ModalsContext.Provider
      value={{ showModal, setShowModal, config, setConfig }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
