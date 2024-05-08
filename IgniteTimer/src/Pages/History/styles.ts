import styled from "styled-components";

export const HistoryContainer =  styled.main`
flex: 1;
display: flex;
flex-direction: column;
padding: 3.5rem;
h1{
  font-size: 1.5rem;
  color: ${(props)=>props.theme["gray-100"]};
}
`

export const HistoryList = styled.div`
flex: 1;
overflow: auto; /* para dar scroll em mobile */ 
margin-top: 2rem;

table {/* toda a tabela */
  width: 100%;
  border-collapse: collapse;/*como so existisse uma borda entre os td e tr */
  min-width: 600px;/* vai forçar quando tiver um tamanho menor gere o scroll*/

  th {/* caixa onde fica titulos */
    background-color:${(props)=>props.theme["gray-600"]} ;
    padding: 1rem;
    text-align: left;
    color: ${(props)=>props.theme["gray-100"]};
    font-size: 0.875rem;
    line-height: 1.6;

    &:first-child{ /* pega primeira th*/
      border-top-left-radius:8px ;
      padding-left: 1.5rem;
    }

    &:last-child{/* ultima primeira th*/
      border-top-right-radius:8px ;
      padding-right: 1.5rem;
    }
  }

  td {/* caixa onde fica conteudo */
      background-color: ${(props)=>props.theme["gray-700"]};
      border-top: 4px solid ${(props)=>props.theme["gray-800"]} ;
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child{ /* pega primeira td*/
      width: 50%;
      padding-left: 1.5rem;
      }

      &:last-child{/* ultima primeira td*/
      padding-right: 1.5rem;
      }

    }
}
` 
const STATUS_COLOR ={ /* crio o objeto para definit cores uso mesmo nome de cores global */
  yellow:'yellow-500',
  green:'green-500',
  red:'red-500',
}as const /* quando passa as const  typescript reconehce as cores como qualquer string, as cont afirma ser as cores em theme passadas*/

interface StatusProps {
  statusColor:keyof typeof STATUS_COLOR /*keyof são as chaves ex: yellow,green,red e  typeof são os tipos ou conteudo do STATUS_COLOR cores iguais do tema global    */
}

/* passo  StatusProps como propriedade do span */
export const Status= styled.span<StatusProps>`
display: flex;
align-items: center;
gap: 0.5rem;

&::before{ /* elemento que fica dentro da tag no caso dentro do span, before é no final que le fica */
content: ''; /* tem que colocar content mesmo que vazio para aparecer */
width: 0.5rem;
height: 0.5rem;
border-radius: 50%;
background: ${(props)=>props.theme[STATUS_COLOR[props.statusColor]]};/* uso theme com array [STATUS_COLOR] mais a propriedade[statusColor] que é definida  no arquivo tsx */
}
`