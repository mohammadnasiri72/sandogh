import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./output.css";
import { store } from "./redux/store.js";
import ThemeProvider from "./theme/index.jsx";
import RtlLayout from "./component/RtlLayout.jsx";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <RtlLayout>
            <App />
          </RtlLayout>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
);
