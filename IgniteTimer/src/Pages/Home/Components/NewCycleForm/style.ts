import styled from "styled-components";

export const FormContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
color:  ${(props)=>props.theme["gray-100"]};
font-size: 1.125rem;
font-weight: bold;
flex-wrap: wrap;/* quando a tela for menor ele vai quebrar o campo em mais linha, se não colocar cria barra de rolagen*/

`
const BaseInput = styled.input`/* aqui  estou criando o estilo basico dos inputs , codigo que seria repetido nos outros inputs */
background: transparent;
height: 2.5rem;
border: 0;
border-bottom:  2px solid ${(props)=>props.theme["gray-500"]};
font-weight: bold;
font-size: 1.125rem;
padding: 0 0.5rem;
color: ${(props)=>props.theme["gray-100"]};

&:focus{
  box-shadow: none;
  border-color:${(props)=>props.theme["green-500"]} ;
}

&::placeholder{
  color: ${(props)=>props.theme["gray-500"]} ;
}
`
export const TaskInput= styled(BaseInput)`/* aqui chamo a configuração base  o  BaseInput para colocar estilo especifico do input*/
flex: 1;
&::-webkit-calendar-picker-indicator{
  display: none !important;
}
`


export const MinutesAmountInput = styled(BaseInput)`
width: 4rem;
`  
