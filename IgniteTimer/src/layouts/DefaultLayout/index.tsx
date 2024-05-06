import { Outlet } from "react-router-dom";/* nada mais é que um espaço para ser inserido um conteudo*/
import { Header } from "../../Components/Header";
import { LayoutContainer } from "./styles";

export function DefaultLayout (){
  return(
    <LayoutContainer>
    <Header/>
    <Outlet/>
    </LayoutContainer>
  )
} 