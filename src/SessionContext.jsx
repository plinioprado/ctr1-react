import { createContext, useState } from "react";

const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [sessionState, setSessionState] = useState(null);

  const setSession = (newSession) => {
    if (newSession) {
      localStorage.setItem("session", JSON.stringify(newSession));
    } else {
      localStorage.removeItem("session");
    }
    setSessionState(newSession);
  };

  const getSession = () => {
    if (sessionState) {
      return sessionState;
    } else {
      return JSON.parse(localStorage.getItem("session"));
    }
  };

  const shop = {
    setSession: setSession,
    session: getSession(),
    api_key: getSession() ? getSession().user.api_key : "",
  };

  return (
    <SessionContext.Provider value={shop}>{children}</SessionContext.Provider>
  );
};

export { SessionContext, SessionContextProvider };
