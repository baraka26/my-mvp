import { createContext, useState } from "react";

// ✅ Export the actual context so components can import it
export const UserContext = createContext();

// ✅ Provider component that wraps your entire app
export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}