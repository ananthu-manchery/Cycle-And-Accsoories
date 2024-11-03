// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [userId, setUserId] = useState(() => localStorage.getItem('user_id') || null);

//   useEffect(() => {
//     if (userId) {
//       localStorage.setItem('user_id', userId);
//     } else {
//       localStorage.removeItem('user_id');
//     }
//   }, [userId]);

//   const logout = () => {
//     setUserId("");  // Clear userId on logout
//   };

//   const isAuthenticated = Boolean(userId); 

//   return (
//     <AuthContext.Provider value={{ userId, setUserId, logout, isAuthenticated  }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem('user_id') || null);

  useEffect(() => {
    if (userId) {
      localStorage.setItem('user_id', userId);
    } else {
      localStorage.removeItem('user_id');
    }
  }, [userId]);

  const login = (newUserId) => {
    if (newUserId) {
      setUserId(newUserId);
      localStorage.setItem('user_id', newUserId);
    }
  };

  // Logout function: Clear user data from state and localStorage
  const logout = () => {
    setUserId(null); // Set state to null (empty user)
    localStorage.removeItem('user_id'); // Clear local storage
  };

  // Check if the user is authenticated
  const isAuthenticated = Boolean(userId);

  return (
    <AuthContext.Provider value={{ userId, setUserId, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
