import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import TabList from "./components/tab/TabList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setting" element={<TabList />} />
    </Routes>
  );
}
export default AppRoutes;
