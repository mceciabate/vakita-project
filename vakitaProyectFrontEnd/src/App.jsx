import './App.css'
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
      <Landing/>
     
    </section>
    </div>
  )
}

export default App
