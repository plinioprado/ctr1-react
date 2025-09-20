import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { SessionContext } from "./SessionContext";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Resources from "./components/resource/Resources";
import Resource from "./components/resource/Resource";
import ResourceView from "./components/resource/ResourceView";

function AppRoutes() {
  const { session } = useContext(SessionContext);

  return (
    <Routes>
      {session ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route
            path="/resource/:component/:resource"
            element={<ResourceView />}
          />
          <Route
            path="/resource/:component/:resource/:view"
            element={<ResourceView />}
          />
          <Route
            path="/resource/:component/:resource/:view/:id"
            element={<ResourceView />}
          />

          <Route path="/:component/:resource" element={<Resources />} />
          <Route path="/:component/:resource/:id" element={<Resource />} />
          <Route path="/" element={<Login />} />
        </>
      ) : (
        <Route path="*" element={<Login />} />
      )}
    </Routes>
  );
}
export default AppRoutes;
