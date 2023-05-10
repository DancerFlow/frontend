import 'styled-components';

interface ModalTheme {
    background: string;
    container: string;
    content: string;
    fontColorOne: string;
    fontColorTwo: string;
    fontColorThree: string;
}
declare module 'styled-components' {
    export interface DefaultTheme {
        blue: string;
        pink: string;
        green: string;
        yellow: string;

        modal: ModalTheme;
    }
}
