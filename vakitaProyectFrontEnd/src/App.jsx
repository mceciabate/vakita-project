import './App.css'
import Header from './components/Header.jsx';
import Landing from './components/Landing.jsx';
import NewVakita from './pages/newVakita/NewVakita'

function App() {

  return (
    <div className="App"> 
    <Header/>
    <Landing/>
    <NewVakita/>
   
    </div>
  )
}

export default App
