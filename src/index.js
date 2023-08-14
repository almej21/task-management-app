import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "features/taskSlice";
import userInfoReducer from "features/userInfoSlice";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    task: taskReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
