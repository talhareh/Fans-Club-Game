import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Buy from './pages/Buy'
import Repo from './pages/gitRepo'
import SplashScreen from './pages/SplashScreen'

const App = () =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element ={<SplashScreen/>} />
        <Route path = 'homepage' element ={<HomePage/>} />
        <Route path= 'buy' element ={<Buy/>} />
        <Route path= 'repo' element ={<Repo/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;