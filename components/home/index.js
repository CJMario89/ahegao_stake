import { Box, Container } from "@chakra-ui/react";
import Image from "next/image";
import homeImg from "/assets/ahegao-home.png";
import ahegao_home_mobile_1 from "/assets/ahegao_home_mobile_1.png";

import About from "./about";
import Staking from "./staking";
import Roadmap from "./roadmap";
import { useEffect, useState } from "react";
import Team from "./team";

const Home = () => {
  const [screenWidth, setScreenWidth] = useState(0);
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
  const isMobile = screenWidth < 1000;
  return (
    <Container
      w="100%"
      mt={!isMobile ? "calc(100px - 5%)" : "56px"}
      overflow="hidden"
    >
      <Box w="100%" h="auto">
        {!isMobile ? (
          <Image
            style={{ width: "100%", height: "auto" }}
            width="1920"
            height="auto"
            src={homeImg}
            alt=""
          />
        ) : (
          <Box
            w="full"
            h="0"
            pt="100vw"
            my="4"
            position="relative"
            overflow="hidden"
          >
            <Image
              style={{
                position: "absolute",
                height: "100%",
                top: "50%",
                left: "45%",
                transform: "translate(-50%, -50%)",
                width: "auto",
              }}
              src={ahegao_home_mobile_1}
              alt=""
            />
          </Box>
        )}
      </Box>
      <About screenWidth={screenWidth} />
      <Staking screenWidth={screenWidth} />
      <Roadmap isMobile={isMobile} />
      <Team screenWidth={screenWidth} isMobile={isMobile} />
    </Container>
  );
};

export default Home;
