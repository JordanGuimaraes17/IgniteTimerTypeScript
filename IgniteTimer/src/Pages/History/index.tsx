// Aqui estamos importando o hook `useContext` da biblioteca React, que nos permite acessar o contexto da nossa aplicação
import { useContext } from "react"

// Aqui estamos importando alguns componentes e estilos que serão usados neste componente History
import { HistoryContainer, HistoryList, Status } from "./styles"

// Aqui estamos importando o contexto `CyclesContext` que será utilizado para obter os ciclos da nossa aplicação
import { CyclesContext } from "../../Context/CyclesContext"

// Aqui estamos importando a função `formatDistanceToNow` da biblioteca `date-fns`, que nos ajuda a formatar datas
import { formatDistanceToNow } from 'date-fns'

// Aqui estamos importando o local `ptBR` da biblioteca `date-fns`, que é usado para formatação de datas em português
import { ptBR } from "date-fns/locale"

// Este é o nosso componente History
export function History() {
  
  // Aqui estamos usando o hook `useContext` para acessar o contexto `CyclesContext` e obter os ciclos
  const { cycles } = useContext(CyclesContext)
  
  // Aqui começamos a retornar a estrutura JSX do nosso componente
  return (
    <HistoryContainer>
      
      {/* Aqui está o título do histórico */}
      <h1>Meu histórico</h1>
      
      {/* Aqui está a lista de histórico */}
      <HistoryList>
        <table>
          
          {/* Aqui está o cabeçalho da tabela */}
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          {/* Aqui está o corpo da tabela */}
          <tbody>
            {/* Aqui usamos o método `map` para iterar sobre todos os ciclos e renderizar uma linha para cada um */}
            {cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
                  
                  {/* Aqui mostramos o nome da tarefa */}
                  <td>{cycle.task}</td>
                  
                  {/* Aqui mostramos a duração da tarefa */}
                  <td>{cycle.minutesAmount} minutos</td>
                  
                  {/* Aqui formatamos a data de início da tarefa */}
                  <td>{formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}</td>
                  
                  {/* Aqui mostramos o status da tarefa, dependendo se foi concluída, interrompida ou está em andamento */}
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>

      </HistoryList>
    </HistoryContainer>
  )
}
