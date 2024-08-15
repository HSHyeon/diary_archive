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
  }
  
  a{
    text-decoration: none;
    color: #000;
  }
`;

export default GlobalStyle;