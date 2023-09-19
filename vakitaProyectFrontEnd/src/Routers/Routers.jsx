import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingComponent from "../components/Landing"
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Header from '../components/Header';
import Protected from '../guards/Protected';
import Dashboard from '../components/Dashboard/Dashboard';
import NewVakita from '../pages/newVakita/NewVakita';
import MyVakita from '../pages/myVakita/MyVakita';
import Menu from '../components/Menu/Menu';
import { useUser } from '../context/UserProvider';
import Perfil from '../components/Perfil/Perfil';
import PaymentApp from "../components/CreditCard/PaymentApp";
import TransactionPage from "../pages/transaction/TransactionPage";
import WithdrawalMoney from "../pages/withdrawal/WithdrawalMoney";
import NotFound from "../pages/notFound/NotFound";





const Routers = () => {
  const { logged } = useUser();

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>

      <Routes>
        <Route path="/" element={<LandingComponent />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Protected isLogged={logged} />}>
          <Route path="/dashboard/*" element={<Menu />}>
            {/* Nested routes without leading slashes */}
            <Route index element={<Dashboard />} />
            <Route path="crear-vaka" element={<NewVakita />} />
            <Route path="mis-vakitas" element={<MyVakita />} />
            <Route path="mi-perfil" element={<Perfil />} />
            <Route path="mis-datos-financieros" element={<PaymentApp />} />
            <Route path="transacciones" element={<TransactionPage/>} />
            <Route path="extraer-dinero" element={<WithdrawalMoney/>} />
            <Route path="*" element={<NotFound/>} />
          </Route>
       
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};
  
  export default Routers;


