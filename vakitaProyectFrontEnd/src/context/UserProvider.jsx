import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [logged, setLogged] = useState(false)

  const [loginData, setLoginData] = useState({
    email: '',
    password: '', 
    // access: false
  });

  



  return (
    <UserContext.Provider value={{ loginData, setLoginData, logged, setLogged  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};