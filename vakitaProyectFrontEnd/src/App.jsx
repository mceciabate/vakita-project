import './App.css'
import Routers from './Routes/Routers';
import Header from './components/Header.jsx';
import Login from './components/Login/Login';


function App() {

  return (
    <div className="App"> 
    <Header/>
  
      <Routers/>
      <Login/>
      
  
    </div>
  )
}

export default App
