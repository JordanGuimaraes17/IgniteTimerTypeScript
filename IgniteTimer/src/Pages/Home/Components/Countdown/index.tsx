import { CountdownContainer, SeparatorContainer} from "./styles"
import { useEffect, useContext } from "react"
import { differenceInSeconds } from "date-fns"
import { CyclesContext } from "../../../../Context/CyclesContext"

export function Countdown(){
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed} = useContext(CyclesContext)

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


  useEffect(()=>{
    let interval : number // Declaração de uma variável que será utilizada para armazenar o identificador do intervalo de tempo.
    if(activeCycle){ // Verifica se existe um ciclo ativo.
        interval = setInterval(()=>{ // Configura um intervalo de tempo que executa uma função a cada segundo.
            const secondsDifference = differenceInSeconds(new Date(),activeCycle.startDate) // Calcula a diferença em segundos entre a data atual e a data de início do ciclo ativo.
            
            if(secondsDifference >= totalSeconds ){ // Verifica se a diferença em segundos é maior ou igual ao total de segundos do ciclo.
              markCurrentCycleAsFinished()
               // setCycles(state => state.map((cycle) =>{ // Atualiza o estado dos ciclos, marcando o ciclo ativo como finalizado.
                 //   if (cycle.id === activeCycleId){ // Verifica se o ciclo atual é o ciclo ativo.
                   //     return{...cycle, finishedDate:new Date()} // Retorna o ciclo atualizado com a data de finalização.
                   // }else{
                     //   return cycle // Retorna os outros ciclos sem alterações.
                   // }
                //}))
                setSecondsPassed(totalSeconds) // Define a quantidade de segundos passados como o total de segundos do ciclo, garantindo que mostre zero quando o ciclo acabar.
                clearInterval(interval) // Limpa o intervalo para evitar acumulação de intervalos quando um novo ciclo começar.
            }else{
              setSecondsPassed(secondsDifference) // Define a quantidade de segundos passados como a diferença em segundos entre a data atual e a data de início do ciclo ativo.
            }
        },1000) // Intervalo de tempo de 1 segundo.
    }
    return ()=>{
        clearInterval(interval) // Limpa o intervalo quando o componente é desmontado para evitar vazamentos de memória.
    }
},[activeCycle,totalSeconds,activeCycleId,markCurrentCycleAsFinished,setSecondsPassed]) // Lista de dependências que dispara a execução do useEffect quando estas variáveis mudam.

useEffect(()=>{
  if(activeCycle){
    document.title = `${minutes}:${seconds}`
  }
},[minutes, seconds ,activeCycle])


  return(
    <CountdownContainer> 
    <span>{minutes[0]}</span>
    <span>{minutes[1]}</span>
    <SeparatorContainer>:</SeparatorContainer>
    <span> {seconds[0]} </span>
    <span> {seconds[1]} </span>
  </CountdownContainer>

  )

  
}