import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider
      router={routes}
      fallbackElement={<div>Loading...</div>}
      errorElement={<div>Error loading the app</div>}
      loaderElement={<div>Loading...</div>}
      actionElement={<div>Loading...</div>}
      errorBoundaryElement={<div>Error loading the app</div>}
      actionBoundaryElement={<div>Error loading the app</div>}
      loaderBoundaryElement={<div>Loading...</div>}
    />
  </StrictMode>
);
