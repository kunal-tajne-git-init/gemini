import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import LoginFailed from "./components/LoginFailed.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "/",
      //   element: <App />,
      // },
    ],
  },
  {
    path: "login-failed",
    element: <LoginFailed />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
