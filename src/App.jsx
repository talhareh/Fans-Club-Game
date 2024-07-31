import { useEffect } from 'react'
import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import Layout from './components/Layout'
import { HomePage, SplashScreen, Repo, Referral, DailyTasks,
          Buy, Vault
 } from './pages'


const App = () =>{

  
  useEffect(() => {
    
    if (window.Telegram && window.Telegram.WebApp) {
      const webapp = window.Telegram.WebApp;
      webapp.expand();
      webapp.ready();
      webapp.setHeaderColor('#F8922A');
      webapp.setBackgroundColor('#FFFFFF');
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
          <Route path= 'vault' element ={<Vault/>} />

        </Route>
        
        <Route path= 'ref' element ={<Referral/>} />
        <Route path= 'repo' element ={<Repo/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;