import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CoinContextProvider } from '../context/CoinContext.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Home from '../components/Home.jsx'
import Coins from '../components/Coins.jsx'
import './index.css'


const theRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route path='' element={<Home/>}/>
    <Route path='coins/:coinId' element={<Coins/>}/>
  </Route>
))


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CoinContextProvider>

  <RouterProvider router={theRouter}/>
  </CoinContextProvider>
   
  </StrictMode>,
)
