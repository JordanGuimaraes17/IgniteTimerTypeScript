/* Esse codigo é para integrar o styled-components no typeScript, para quando usat theme o typeScript reconheça e mostre opções disponivel facilitando  achar propriedades e erros */

import  'styled-components';
import {defaultTheme}from "../styles/themes/default"

type ThemeType = typeof defaultTheme;

declare module 'styled-components'{
export interface DefaultTheme extends ThemeType {}
}