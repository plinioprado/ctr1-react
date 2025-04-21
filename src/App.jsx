import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppRoutes from "./AppRoutes.jsx";
import Header from "./components/header/Header.jsx";
import Login from "./components/login/Login.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </>
  );
}

export default App;
