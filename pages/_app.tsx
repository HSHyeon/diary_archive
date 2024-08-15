import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/store";
import HeaderComp from "../src/components/HeaderComp";
import { ThemeProvider } from "styled-components";
import { theme } from "../global/theme";
import GlobalStyle from "../global/global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <main>
          <HeaderComp />
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
