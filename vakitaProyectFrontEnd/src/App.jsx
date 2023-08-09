import './App.css'
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header.jsx';
import Landing from './components/Landing.jsx';
import Menu from './components/Menu/Menu';

function App() {

  return (
    <div className="App"> 
    <Header/>
    <section className='section-landing'>
      <div className='div-menu'>
        <Menu/>
      </div>
      {/* <Landing/> */}
      <Dashboard />
    </section>
    </div>
  )
}

export default App
