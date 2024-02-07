import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle `
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html{
    overflow-x: hidden
}

body{
    overflow-x: hidden
}

*::selection{
    background-color:grey;
}

`

export default GlobalStyle