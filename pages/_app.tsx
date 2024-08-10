import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/store";
import  "./global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>

      <main>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
export default MyApp;
