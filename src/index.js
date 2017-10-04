import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./reducers";
import App from "./containers/App";
import "./index.css";
const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}
const persistedState = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : {};

const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(...middleware)
);
store.subscribe(() => {
  localStorage.setItem("data", JSON.stringify(store.getState()));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
