// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// ✅ Create Context
const UserContext = createContext();

// ✅ Custom hook for cleaner usage
export const useUser = () => useContext(UserContext);

// ✅ Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔒 Simulated Auth Fetch — replace with real auth backend
  useEffect(() => {
    const simulateAuth = async () => {
      try {
        // Placeholder for token/session check
        const storedUser = JSON.parse(localStorage.getItem("applica_user"));
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    simulateAuth();
  }, []);

  // 🔁 Sync to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("applica_user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
