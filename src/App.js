import React from "react";
import "./App.scss";
import SpinnerProvider from "./context/Spinner";
import Routing from "./routes/Routing";

function App() {
  return (
    <div className="App text-xs">
      <SpinnerProvider>
        <Routing />
      </SpinnerProvider>
    </div>
  );
}

export default App;
