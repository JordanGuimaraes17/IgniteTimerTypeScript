import { defaultTheme } from './styles/themes/default'
import {ThemeProvider } from 'styled-components'
import { GlobalStyled } from './styles/global'
import { Router } from './Router'
import {BrowserRouter} from 'react-router-dom'


export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
      <Router/>
      </BrowserRouter>
      <GlobalStyled/> 
    </ThemeProvider>
  )
}





