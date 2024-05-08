import{useForm} from 'react-hook-form'
import { Play } from 'phosphor-react'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod' /* fazemos a importação assim , porque a biblioteca não uma importação default, teria destrututar e pegar função individual, fazemos assim que pega todas as funções  dentro da  biblioteca zod */

import {
  HomeContainer,
  FormContainer, 
  CountdownContainer, 
  SeparatorContainer,
  StartCountdownButton, 
  TaskInput, 
  MinutesAmountInput }
  from "./styles"

  /* aqui criamos o esquema o modelo de validação, colocamos zod.object porque o input retorna um objeto */
const newCycleFormValidationSchema = zod.object({
  task:zod
  .string()
  .min(1,'Informe a tarefa'),
  
  minutesAmount:zod
  .number()
  .min(5)
  .max(60),

})

// modo de fazer sem o zod aqui criamos  o modelo para o typeScript entender os dados 
//interface NewCycleFormData {
//task:string
//minutesAmount:number
//}


// aqui criamos um tipo do TS  para criar o modelo atumatico em vez fe fazer a interface
type NewCycleFormData = zod.infer< typeof newCycleFormValidationSchema>

export function Home(){
  const {register,handleSubmit, watch, reset}= useForm<NewCycleFormData>({
    /* chamos o resolver usando o zodResolver e dentro dele colocamos o schemas */
    resolver:zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task:'',
      minutesAmount:0,
    },
  })

  const task = watch('task')
  const isSubmitDisabled =!task

  function handleCreateNewCycle(data:NewCycleFormData){
    console.log(data)
    reset();// funão do useForm que limpa depois do submit, mas se não tiver nada definido em defaultValues
  }

  return (
    <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
          <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          id="task"
          list="task-suggestion"
          placeholder="Dê um nome para o seu projeto"
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
          {...register('minutesAmount',{valueAsNumber:true})} /* passa um sengundo paramentro, porque esta indo com string mas queremos numero*/
          />

        <span>minutos.</span>
          </FormContainer>

        <CountdownContainer> 
          <span>0</span>
          <span>0</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton  disabled={isSubmitDisabled } type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton>
        </form>


    </HomeContainer>
    
  )
}