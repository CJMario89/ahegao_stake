import Head from "next/head";
import "../styles/globals.css";
import Header from "../components/header";
import { Source_Sans_Pro } from "next/font/google";
import Footer from "../components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SourceSansPro = Source_Sans_Pro({
  weight: "400",
  subsets: ["latin"],
});
export const ContractContext = createContext();
export const AccountContext = createContext();
function MyApp({ Component, pageProps }) {
  const [ERC721, setERC721] = useState();
  const [STAKE, setSTAKE] = useState();
  const [account, setAccount] = useState();
  const [status, setStatus] = useState("idle");
  const [signer, setSigner] = useState();
  const [screenWidth, setScreenWidth] = useState(0);
  const queryClient = new QueryClient();
  useEffect(() => {
    const onResize = (e) => {
      setScreenWidth(e.target.innerWidth);
    };
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [screenWidth]);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ContractContext.Provider value={{ ERC721, setERC721, STAKE, setSTAKE }}>
        <AccountContext.Provider
          value={{ account, setAccount, status, setStatus, signer, setSigner }}
        >
          <div className={SourceSansPro.className}>
            <Head>
              <title>Ahegao</title>
              <meta
                name="description"
                content="Building red light district in Web3"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header screenWidth={screenWidth} />
            <Component {...pageProps} />
            <Footer screenWidth={screenWidth} />
          </div>
        </AccountContext.Provider>
      </ContractContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
