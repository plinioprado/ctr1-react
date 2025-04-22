import { createContext, useState } from "react";

const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const shop = {
    setSession: setSession,
    session: session,
    api_key: session ? session.user.api_key : "",
  };

  return (
    <SessionContext.Provider value={shop}>{children}</SessionContext.Provider>
  );
};

export { SessionContext, SessionContextProvider };
