import {Routes,Route} from 'react-router-dom'/* Route coloca por volta das rotas existentes  e usar o layout*/
import { Home } from './Pages/Home'
import { History } from './Pages/History'
import { DefaultLayout } from './layouts/DefaultLayout'


export function Router(){
  return(
    <Routes>
      
      <Route path='/' element={<DefaultLayout/>}> 

      <Route path='/' element={<Home/>}/>
      <Route path='/history' element={<History/>} />

      </Route>

    </Routes>
  )
}