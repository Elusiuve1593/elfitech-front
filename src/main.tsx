import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </Provider>
);
