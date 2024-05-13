import { HandPalm, Play } from 'phosphor-react'
import { useForm,FormProvider } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod' /* fazemos a importação assim , porque a biblioteca não uma importação default, teria destrututar e pegar função individual, fazemos assim que pega todas as funções  dentro da  biblioteca zod */
import {  useContext} from 'react'
import {
  HomeContainer,
  StartCountdownButton, 
  StopCountdownButton}
  from "./styles"
import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'
import { CyclesContext } from '../../Context/CyclesContext'

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
   // Obtendo funções e dados do contexto de ciclos
  const {activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)

 // Inicializando o formulário usando o hook useForm
const newCycleForm = useForm<NewCycleFormData>({
  resolver: zodResolver(newCycleFormValidationSchema), // Definindo o resolver com zodResolver e passando o esquema de validação
  defaultValues: {
    task: '',
    minutesAmount: 0,
  },
})

const { handleSubmit, watch, reset } = newCycleForm // Destructuring das funções do formulário

// Função para lidar com a criação de um novo ciclo
function handleCreateNewCycle(data: NewCycleFormData) {
  createNewCycle(data) // Chamando a função para criar um novo ciclo com os dados do formulário
  reset() // Resetando o formulário após a submissão
}

const task = watch('task') // Obtendo o valor do campo 'task' do formulário
const isSubmitDisabled = !task // Verificando se o botão de submissão deve estar desabilitado


  return (
    <HomeContainer>
        <form   onSubmit={handleSubmit( handleCreateNewCycle)}  action="">
            <FormProvider {...newCycleForm} >
              <NewCycleForm/>
            </FormProvider>
          <Countdown/>

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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