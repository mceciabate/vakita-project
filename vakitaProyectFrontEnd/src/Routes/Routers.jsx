import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingComponent from "../components/Landing";
import Dashboard from "../components/Dashboard/Dashboard";

const Routers = () => {

    return (
      <BrowserRouter>
       
        
                <Routes>
                  {/* <Route path="/product/:id" element={<Product />} /> */}
                  <Route path="/" element={<LandingComponent/>} />
                  {/* <Route path="/logIn" element={<LogIn />} /> */}
                  {/* <Route
                    path="/register"
                    element={<Register />}
                  /> */}
                  {/* <Route element={<ProtectedRoutes isLogged={logged} />}> */}
                    <Route path="/dashboard" element={<Dashboard/>} />
                    {/* <Route path="/newProduct/features" element={<View2 />} />
                    <Route path="/newProduct/preview/product" element={<Preview />} />
                    <Route path="/newProduct/ubication" element={<ViewUbication/>} />
                    <Route path="/newProduct/preview" element={<View3/>} />
                    <Route path="/product/:id/booking" element={<Booking />} /> */}
                  {/* </Route> */}
                </Routes>
            
            
      </BrowserRouter>
    );
  };
  
  export default Routers;