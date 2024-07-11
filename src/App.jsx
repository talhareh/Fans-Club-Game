import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Buy from './pages/Buy'


const App = () =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element ={<HomePage/>} />
        <Route path= 'buy' element ={<Buy/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;