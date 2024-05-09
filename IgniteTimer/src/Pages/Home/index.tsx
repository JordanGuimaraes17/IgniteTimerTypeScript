import { useState } from 'react'
import { Play } from 'phosphor-react'
import{useForm} from 'react-hook-form'
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

interface Cycle{
  id:string
  task:string
  minutesAmount:number
}

export function Home(){
  // criamos um estado e usamos o generico do TS <Cycle[]> colocamos array pq a interface recebe uma lista com varios ciclos
  const [cycles,setCycles] = useState<Cycle[]>([])

  // estado que aplicação vai começar, null porque começa zerado 
  const [activeCycleId, setActiveCycleId]= useState <string | null> (null)

  // vai armarzenar o tanto de segundos que se passaram desde que o ciclo foi criado ta ativo
  const [amountSecondsPassed,SetAmountSecondsPassed]= useState(0)

  const {register,handleSubmit, watch, reset}= useForm<NewCycleFormData>({
    /* chamos o resolver usando o zodResolver e dentro dele colocamos o schemas */
    resolver:zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task:'',
      minutesAmount:0,
    },
  })

  /* aqui a variavel percorre o vetor de ciclos  e vai encontra(usa o find ),  um ciclo em que o id do ciclo seja igual ao id do ciclo ativo */
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) 
  console.log(activeCycle)

  /* ciclo pode estar ativo ou não, quando usuario aperta f5 não fica com nehum ciclo ativo então, se eu tiver um ciclo ativo 
  activeCycle.minutesAmount * 60      se não  0 */  
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  
  //  aqui faz a conta quanto segundos ja passou  se tiver um ciclo ativo  vai ser totalSeconds - amountSecondsPassed se não 0
  const currentSeconds= activeCycle? totalSeconds - amountSecondsPassed :0 

// aqui faz a divisão usa Math.floor para qrrendor pra baixo para não aprecer numero quebrado
  const minutesAmount = Math.floor(currentSeconds/60)
  const secondsAmount = currentSeconds % 60 // % operador de resto 

  const minutes= String(minutesAmount).padStart(2,'0')
  const seconds= String(secondsAmount).padStart(2,'0')

  const task = watch('task')
  const isSubmitDisabled =!task

  function handleCreateNewCycle(data:NewCycleFormData){
    /* na variavel passei Cycle que é a interface  deixando o TS  inteligente e mostrando as opcoes que tem para ver pressionar Ctrl mais espaço */

     // para não ter id  repetido
    const id = String(new Date().getTime())

    const newCycle:Cycle = {
      id,
      task: data.task,
      minutesAmount:data.minutesAmount,
    }

    // aqui pegamos o estado atual da variavel Cycle com o parametro state usando arrow function e colocamos o novo newCycle
    setCycles((state)=>[...state,newCycle])

    // setando o ciclo recem criado, como sendo meu ciclo ativo, e pegamos o id gerado 
    setActiveCycleId(id)

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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span> {seconds[0]} </span>
          <span> {seconds[1]} </span>
        </CountdownContainer>

        <StartCountdownButton  disabled={isSubmitDisabled } type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton>
        </form>


    </HomeContainer>
    
  )
}