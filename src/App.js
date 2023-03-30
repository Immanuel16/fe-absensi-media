import React from "react";
import "./App.scss";
import ModalsProvider from "./context/ModalsContext";
import SpinnerProvider from "./context/Spinner";
import Routing from "./routes/Routing";

function App() {
  return (
    <div className="App text-xs">
      <SpinnerProvider>
        <ModalsProvider>
          <Routing />
        </ModalsProvider>
      </SpinnerProvider>
    </div>
  );
}

export default App;
