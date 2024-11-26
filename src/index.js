import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./js/page/HomePage";
import ViewDebugger from "./js/page/ViewDebugger";
import BuyingContextProvider from "./js/context/BuyingContext";
import BeatsContextProvider from "./js/context/BeatsContext";
// import AdminPage from "./js/page/AdminPage";
import AdminContextProvider from "./js/context/AdminContext";
import BeatPage from "./js/page/BeatPage";

export const baseUrl = 'https://prodlinenbackend.linendev.workers.dev/'
// export const baseUrl = "http://localhost:8787";

// end of global functions section

// Routes defining for the application
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  // {
  //   path: "/admin",
  //   element: <AdminPage />,
  // },
  {
    path: "beat/:beatid",
    element: <BeatPage />,
  },
  {
    path: "/vd",
    element: <ViewDebugger />,
  }
]);
// end of routes defining sectin

root.render(
  // <React.StrictMode>
  <AdminContextProvider>
    <BeatsContextProvider>
      <BuyingContextProvider>
        <RouterProvider router={router} />        
      </BuyingContextProvider>          
    </BeatsContextProvider>
  </AdminContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
