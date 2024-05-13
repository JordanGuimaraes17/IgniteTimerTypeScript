import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod' /* fazemos a importação assim , porque a biblioteca não uma importação default, teria destrututar e pegar função individual, fazemos assim que pega todas as funções  dentro da  biblioteca zod */
import { createContext, useState } from 'react'
import {
  HomeContainer,
  StartCountdownButton, 
  StopCountdownButton}
  from "./styles"
import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'

interface Cycle{
  id:string
  task:string
  minutesAmount:number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle:Cycle | undefined // se não tenho um ciclo ativo é indefinido 
  activeCycleId:string | null
  amountSecondsPassed:number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed:(seconds:number)=> void
} 

export const CyclesContext = createContext({} as CyclesContextType)

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
  // criamos um estado e usamos o generico do TS <Cycle[]> colocamos array pq a interface recebe uma lista com varios ciclos
  const [cycles,setCycles] = useState<Cycle[]>([])

    // vai armarzenar o tanto de segundos que se passaram desde que o ciclo foi criado ta ativo
    const [amountSecondsPassed,SetAmountSecondsPassed]= useState(0)

  // estado que aplicação vai começar, null porque começa zerado 
  const [activeCycleId, setActiveCycleId]= useState <string | null> (null)

  const newCycleForm = useForm <NewCycleFormData> ({
    /* chamos o resolver usando o zodResolver e dentro dele colocamos o schemas */
    resolver:zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task:'',
      minutesAmount:0,
    },
  })

  const { handleSubmit, watch, reset} = newCycleForm

  /* aqui a variavel percorre o vetor de ciclos  e vai encontra(usa o find ),  um ciclo em que o id do ciclo seja igual ao id do ciclo ativo */
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) 

  const task = watch('task')
  const isSubmitDisabled =!task

  function setSecondsPassed(seconds:number){
    SetAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished(){
    setCycles((state)=>
      state.map((cycle)=> {
        if(cycle.id===activeCycleId) {
          return{...cycle,finishedDate:new Date()}
        }else{
          return cycle
        }
      }),
    )
    
  }

  function handleCreateNewCycle(data:NewCycleFormData){
    /* na variavel passei Cycle que é a interface  deixando o TS  inteligente e mostrando as opcoes que tem para ver pressionar Ctrl mais espaço */

     // para não ter id  repetido
    const id = String(new Date().getTime())

    const newCycle:Cycle = {
      id,
      task: data.task,
      minutesAmount:data.minutesAmount,
      startDate: new Date(),
    }

    /* seria assim ->  setCycles([...cicles,newCycle]) ,  mas usamos a imutabilidade sempre que quermos adicionar uma nova informação  copiamos oque ja existe usando ... rest operator , e como estamos atualizando um estado que depende dele mesmo é legal sempre usar uma arraw function pra respeitar 
    */
    setCycles((state)=>[...state,newCycle])
    // setando o ciclo recem criado, como sendo meu ciclo ativo, e pegamos o id gerado 
    setActiveCycleId(id)
    SetAmountSecondsPassed(0) // depois que crio volta a zero os segundos passados
    reset();// função do useForm que limpa depois do submit, mas se não tiver nada definido em defaultValues
  }

  function handleInterruptCycle(){
    setCycles(state=> state.map((cycle) =>{
      if (cycle.id === activeCycleId){ // aqui altera o ciclo que esta ativo
        return{...cycle, interruptedDate:new Date()} // retorna cada um dos ciclos alterados
      }else{
        return cycle // ou não alterados
      }
    })
    )
    setActiveCycleId(null)// quando interrompido volta para zero
  }


  return (
    <HomeContainer>
        <form   onSubmit={handleSubmit(handleCreateNewCycle)}  action="">
          <CyclesContext.Provider value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed}}>
            
            <FormProvider {...newCycleForm} >
              <NewCycleForm/>
            </FormProvider>

          <Countdown/>

          </CyclesContext.Provider>
          
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
          <HandPalm size={24}/>
          Interronper 
        </StopCountdownButton>

        ):(
          <StartCountdownButton  disabled={isSubmitDisabled } type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton>
        )}
        </form>


    </HomeContainer>
    
  )
}