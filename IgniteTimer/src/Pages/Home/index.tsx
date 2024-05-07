import { Play } from "phosphor-react"
import { HomeContainer,FormContainer, CountdownContainer, SeparatorContainer,StartCountdownButton, TaskInput, MinutesAmountInput } from "./styles"

export function Home(){
  return (
    <HomeContainer>
        <form action="">
          <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          placeholder="Dê um nome para o seu projeto" 
          id="task" 
          list="task-suggestion"/>

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

        <StartCountdownButton disabled type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton>
        </form>


    </HomeContainer>
    
  )
}