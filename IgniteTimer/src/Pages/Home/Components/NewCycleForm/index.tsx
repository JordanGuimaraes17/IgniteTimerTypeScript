import { FormContainer,TaskInput,MinutesAmountInput } from "./style"
import { useContext } from "react"
import { CyclesContext } from "../.."
import { useFormContext } from "react-hook-form"


export function NewCycleForm(){
  const {activeCycle} = useContext (CyclesContext)
  const {register} = useFormContext()



  return(
    <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          id="task"
          list="task-suggestion"
          placeholder="Dê um nome para o seu projeto"
          disabled={!!activeCycle} // dois !! porque teria que ser boloeano true o false , ai converte se tiver algum valor pra true se não false
          {...register('task')} 
          />

        <datalist id="task-suggestion">
          <option value="Projeto 1"/>
          <option value="Projeto 2"/>
          <option value="Pato"/>
        </datalist>

        <label htmlFor="">Durante</label>
        <MinutesAmountInput 
          placeholder="00"
          type="number"
          id="minutesAmount"
          step={5}
          min={5}
          max={60}
          disabled={!!activeCycle}
          {...register('minutesAmount',{valueAsNumber:true})} /* passa um sengundo paramentro, porque esta indo com string mas queremos numero*/
          />

        <span>minutos.</span>
          </FormContainer>

  )
}

