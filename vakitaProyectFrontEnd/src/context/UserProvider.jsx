import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

// const [logged, setLogged] = useState(false)

export const UserProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '', 
    access: false
  });

  return (
    <UserContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};