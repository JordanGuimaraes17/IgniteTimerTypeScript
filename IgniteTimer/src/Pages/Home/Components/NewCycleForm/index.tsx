// Importando os componentes e estilos necessários para o formulário
import { FormContainer, TaskInput, MinutesAmountInput } from "./style"

// Importando o hook useContext do React para acessar o contexto de ciclos
import { useContext } from "react"

// Importando o contexto de ciclos
import { CyclesContext } from "../../../../Context/CyclesContext"

// Importando o hook useFormContext do react-hook-form para acessar o contexto do formulário
import { useFormContext } from "react-hook-form"

// Componente do formulário para criar um novo ciclo
export function NewCycleForm() {
  
  // Obtendo o ciclo ativo do contexto de ciclos
  const { activeCycle } = useContext(CyclesContext)
  
  // Obtendo o registro do formulário do contexto do formulário
  const { register } = useFormContext()

  // Renderização do formulário
  return (
    <FormContainer>
      {/* Campo para inserir a tarefa */}
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput 
        id="task"
        list="task-suggestion"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle} // Desabilita o campo se houver um ciclo ativo
        {...register('task')} // Registra o campo no formulário
      />

      {/* Lista de sugestões de tarefas */}
      <datalist id="task-suggestion">
        <option value="Projeto 1"/>
        <option value="Projeto 2"/>
        <option value="Pato"/>
      </datalist>

      {/* Campo para inserir a duração */}
      <label htmlFor="minutesAmount">Durante</label>
      <MinutesAmountInput 
        placeholder="00"
        type="number"
        id="minutesAmount"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle} // Desabilita o campo se houver um ciclo ativo
        {...register('minutesAmount', { valueAsNumber: true })} // Registra o campo no formulário e converte o valor para número
      />
      
      <span>minutos.</span>
    </FormContainer>
  )
}
