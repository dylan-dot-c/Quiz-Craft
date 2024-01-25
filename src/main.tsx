import React from "react";
import ReactDOM from "react-dom/client";
import App, { router } from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        {/* <App /> */}
        <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
        />{" "}
    </React.StrictMode>
);
