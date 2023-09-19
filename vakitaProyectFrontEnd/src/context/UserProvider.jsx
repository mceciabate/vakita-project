import React, { createContext, useContext,  useState } from 'react';


const UserContext = createContext();


export const UserProvider = ({ children }) => {

  const login = localStorage.getItem("token") && true
  const [logged, setLogged] = useState(login)

  const [userId, setUserId] = useState(null);


  const [loginData, setLoginData] = useState({
    email: '',
    password: '', 
   
  });

  



  return (
    <UserContext.Provider value={{ loginData, setLoginData, userId, setUserId, logged, setLogged  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};


