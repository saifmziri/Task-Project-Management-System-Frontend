import "./App.css";

import { RouterProvider } from "react-router-dom";

import { ToastProvider } from "./context/ToastContext";
import { router } from "./routes";

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
