import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';


const UserContext = createContext();


export const UserProvider = ({ children }) => {

  const login = localStorage.getItem("token") && true
  const [logged, setLogged] = useState(login)

  const [userId, setUserId] = useState(null);


  const [listUsers, setListUsers]=useState([])
 
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (token) {
      try {
        const decode = jwt_decode(token);
        const emailUser = decode.sub;

        axios.get("http://107.22.65.36:8080/api/v1/usuarios")
          .then((res) => {
            setListUsers(res.data);
          })
          .catch((error) => {
            console.error("Error fetching user list:", error);
          });
        
        const matchingUser = listUsers.find(user => user.email === emailUser);
        if (matchingUser) {
          setUserId(matchingUser.id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token, listUsers]);

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