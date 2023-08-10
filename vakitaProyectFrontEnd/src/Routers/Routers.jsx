import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingComponent from "../components/Landing"
import LogIn from '../components/LogIn';
import Header from '../components/Header';
import Protected from '../guards/Protected';
import Dashboard from '../components/Dashboard/Dashboard';
import NewVakita from '../pages/newVakita/NewVakita';
import MyVakita from '../pages/myVakita/MyVakita';
import Menu from '../components/Menu/Menu';

const Routers = () => {
    // const { logged } = useContext(UserContext);
   
    const isSignedIn=true;
    return (
      <BrowserRouter>
      <div className="App"> 
    <Header/>
    </div>
        
                <Routes>
            
                  <Route path="/" element={<LandingComponent/>} /> 
                  <Route path="/log-in" element={<LogIn />} />
                  {/* <Route
                    path="/register"
                    element={<Register />}
                  /> */}
                   <Route element={<Protected isLogged={isSignedIn} />}> 
                   
                   <Route path="/menu/*" element={<Menu />}>
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