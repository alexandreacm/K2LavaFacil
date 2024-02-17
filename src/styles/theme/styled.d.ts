import 'styled-components/native'

declare module 'styled-components/native' {
    export interface DefaultTheme {
        colors: {
            ui: {
                PRIMARY: string;
                SECONDARY: string;
                WHITE: string;
                BLACK: string;
                ERROR: string;
                SUCCESS: string;
                BUTTON: string;
            },
            text: {
                WHITE: string;
                BLACK: string;
                ERROR: string;
                SUCCESS: string;
                TITLE: string;
            },
            button: {
                PRIMARY: string;
                SECONDARY: string;
            }
        };
    }
}