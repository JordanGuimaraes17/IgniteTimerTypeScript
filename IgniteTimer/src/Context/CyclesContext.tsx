// Importando ReactNode (tipo que representa qualquer conteúdo renderizável do React), createContext e useState do React
import { ReactNode, createContext, useState } from "react"

// Definindo a interface para os dados necessários para criar um novo ciclo
interface CreateCycleData {
  task: string
  minutesAmount: number
}

// Definindo a interface para o ciclo em si
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

// Definindo a interface para o contexto dos ciclos
interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined // O ciclo ativo pode ser undefined se não houver ciclo ativo
  activeCycleId: string | null // O ID do ciclo ativo pode ser null se não houver ciclo ativo
  amountSecondsPassed: number // Quantidade de segundos passados desde o início do ciclo ativo
  markCurrentCycleAsFinished: () => void // Função para marcar o ciclo atual como finalizado
  setSecondsPassed: (seconds: number) => void // Função para definir a quantidade de segundos passados
  createNewCycle: (data: CreateCycleData) => void // Função para criar um novo ciclo
  interruptCurrentCycle: () => void // Função para interromper o ciclo atual
} 

// Criando o contexto dos ciclos
export const CyclesContext = createContext({} as CyclesContextType)

// Definindo as propriedades para o provedor do contexto de ciclos
interface CyclesContextProviderProps {
  children: ReactNode // Os componentes filhos do provedor
}

// Componente provedor do contexto de ciclos
export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

  // Estado para armazenar os ciclos
  const [cycles, setCycles] = useState<Cycle[]>([])

  // Estado para armazenar a quantidade de segundos passados desde o início do ciclo ativo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // Estado para armazenar o ID do ciclo ativo, inicialmente é null
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // Encontra o ciclo ativo com base no ID
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) 

  // Função para definir a quantidade de segundos passados
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  // Função para marcar o ciclo atual como finalizado
  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  // Função para criar um novo ciclo
  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime()) // Cria um ID único com base no timestamp
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    // Adiciona o novo ciclo ao estado dos ciclos
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id) // Define o novo ciclo como ativo
    setAmountSecondsPassed(0) // Reinicia a contagem de segundos passados
  }

  // Função para interromper o ciclo atual
  function interruptCurrentCycle() {
    // Atualiza o ciclo atual marcando-o como interrompido
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null) // Define o ciclo ativo como null (não há ciclo ativo)
  }

  // Retorna o provedor do contexto de ciclos com os valores e funções necessários
  return (
    <CyclesContext.Provider value={{
      cycles,
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      markCurrentCycleAsFinished,
      setSecondsPassed,
      createNewCycle,
      interruptCurrentCycle
    }}>
      {children}
    </CyclesContext.Provider>
  )
}
