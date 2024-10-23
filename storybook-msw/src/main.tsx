import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserList } from "./components/UserList/UserList";
import { App } from "./components/App";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <UserList />
    </App>
  </StrictMode>
);
