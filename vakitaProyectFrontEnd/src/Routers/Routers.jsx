import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingComponent from "../components/Landing"
import Login from '../components/Login/Login';
// import Register from "../components/Register"
import Register from '../components/Register/Register';
import Header from '../components/Header';
import Protected from '../guards/Protected';
import Dashboard from '../components/Dashboard/Dashboard';
import NewVakita from '../pages/newVakita/NewVakita';
import MyVakita from '../pages/myVakita/MyVakita';
import Menu from '../components/Menu/Menu';
import { useUser } from '../context/UserProvider';

const Routers = () => {
    const { logged } = useUser();
  
    return (
      <BrowserRouter>
      <div className="App"> 
    <Header/>
    </div>
        
                <Routes>
            
                  <Route path="/" element={<LandingComponent/>} /> 
                  <Route path="/log-in" element={<Login />} />
                  <Route path="/register" element={<Register/>}
                  />
                   <Route element={<Protected isLogged={logged} />}> 
                   
                   <Route path="/dashboard/*" element={<Menu />}>
            {/* Nested routes without leading slashes */}
            <Route index element={<Dashboard />} />
            <Route path="crear-vaca" element={<NewVakita />} />
            <Route path="mis-vaquitas" element={<MyVakita/>} />
          </Route>
                  
                   </Route> 
                </Routes>
           
      </BrowserRouter>
    );
  };
  
  export default Routers;