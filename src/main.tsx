import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MessagesContextProvider from "./contexts/MessagesContext.tsx";
import SystemContextProvider from "./contexts/SystemContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MessagesContextProvider>
      <SystemContextProvider>
        <App />
      </SystemContextProvider>
    </MessagesContextProvider>
  </React.StrictMode>
);
