import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { SessionContext } from "./SessionContext";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Tabs from "./components/tab/Tabs";
import Tab from "./components/tab/Tab";

function AppRoutes() {
  const { session } = useContext(SessionContext);

  return (
    <Routes>
      {session ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/tab" element={<Tabs />} />
          <Route path="/tab/:id" element={<Tab />} />
          <Route path="/" element={<Login />} />
        </>
      ) : (
        <Route path="*" element={<Login />} />
      )}
    </Routes>
  );
}
export default AppRoutes;
