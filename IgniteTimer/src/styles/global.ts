import {createGlobalStyle} from 'styled-components'

export const GlobalStyled=  createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:focus{
  outline: 0;
  box-shadow: 0 0 0 2px ${props=>props.theme['green-400']};
}

body{
  background: ${props => props.theme['gray-900']};
  color: ${props=> props.theme['gray-300']};
  -webkit-font-smoothing:antialiased ;/*melhora um pouco visibilidade das fontes */
}

body,input,textarea,button{
  font-family: 'roboto', sans-serif;
  font-weight: 400;
  font-size: 1rem;
}


`
