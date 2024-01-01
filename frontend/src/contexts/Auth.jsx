import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [connected, setConnected] = useState("Not connected");

  const contextValue = useMemo(
    () => ({ connected, setConnected }),
    [connected, setConnected]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
