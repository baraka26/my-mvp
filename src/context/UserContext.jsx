 import { createContext, useContext, useState } from 'react';

// 1. Create the context
const UserContext = createContext();

// 2. Create the provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null until authenticated
  const [isLoading, setIsLoading] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom hook for easier access
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
