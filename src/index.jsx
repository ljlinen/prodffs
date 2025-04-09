import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./js/page/HomePage";
import ViewDebugger from "./js/page/ViewDebugger";
import BuyingContextProvider from "./js/context/BuyingContext";
import BeatsContextProvider from "./js/context/BeatsContext";
import AdminPage from "./js/page/AdminPage";
import AdminContextProvider from "./js/context/AdminContext";
import BeatPage from "./js/page/BeatPage";
import Error from "./js/page/Error";

export const productionMode = false

export const baseUrl = productionMode ?
"https://prodlinenbackend.linendev.workers.dev" : 
"http://localhost:8787";

// end of global functions section hopefullu work
// Routes defining for the application
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
  productionMode ?
  [{
    path: "/",
    element: <HomePage />,
    errorElement: <Error page='home page' />
  },
  {
    path: "beat/:beatid",
    element: <BeatPage />
  },
  {
    path: "/vd",
    element: <ViewDebugger />,
    errorElement: <Error page='debugger page' />
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <Error page='admin page' />
  }] :
  [{
    path: "/",
    element: <HomePage />,
    errorElement: <Error page='home page' />
  },
  {
    path: "beat/:beatid",
    element: <BeatPage />
  },
  {
    path: "/vd",
    element: <ViewDebugger />,
    errorElement: <Error page='debugger page' />
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <Error page='admin page' />
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
