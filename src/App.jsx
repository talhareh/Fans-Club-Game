import { useEffect } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import DailyTasks from './pages/DailyTasks'
import Repo from './pages/gitRepo'
import SplashScreen from './pages/SplashScreen'
import Referral from './pages/Referral'
import Layout from './components/Layout'
import Buy from './pages/Buy'
import WebApp from '@twa-dev/sdk'

const App = () =>{

  useEffect(() => {
    
    if (window.Telegram && window.Telegram.WebApp) {
      const webapp = window.Telegram.WebApp;
      webapp.expand();
      webapp.ready();
      webapp.setHeaderColor('#F8922A');
      webapp.setBackgroundColor('#FFFFFF');
    }
    if(WebApp.initDataUnsafe.user){
      console.log(WebApp.initDataUnsafe.user)
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element ={<SplashScreen/>} />
        <Route element={<Layout />}>
          <Route path = 'homepage' element ={<HomePage userId= {123}/>} />
          <Route path= 'ref' element ={<Referral/>} />
          <Route path= 'earn' element ={<DailyTasks/>} />
          <Route path= 'buy' element ={<Buy/>} />

        </Route>
        
        <Route path= 'ref' element ={<Referral/>} />
        <Route path= 'repo' element ={<Repo/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;