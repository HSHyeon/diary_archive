import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";


const GlobalStyle = createGlobalStyle`
  ${reset}

  // styled-react-modal basestyled을 override하여 수정
  *[class*="baseStyles__BaseModalBackground"] {
    height: 100%;
  }

  body {
    box-sizing:border-box;
    font-family: "NotoSansKR", Arial, Helvetica, sans-serif;
    color: #fff;
    background-color: #000;
  }
  
  :root {
    --fc-border-color: #000;
  }

  p{
    line-height: 1.6;
    font-size: 1rem;
  }
  
  a{
    text-decoration: none;
    color: #fff;
  }
`;

export default GlobalStyle;