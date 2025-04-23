import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { SessionContextProvider } from "./SessionContext.jsx";

import AppRoutes from "./AppRoutes.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <SessionContextProvider>
            <Header />
            <AppRoutes />
            <Footer />
          </SessionContextProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
