import { Box, Flex, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../assets/logo.png";

import { SiOpensea, SiTwitter } from "react-icons/si";

const Footer = ({ screenWidth }) => {
  const isMobile = screenWidth < 1000;
  return (
    <Flex
      height="max-content"
      w="100%"
      top="0"
      bgColor="rgba(0, 0, 0, 1)"
      py={isMobile ? "20px" : "30px"}
      justifyContent="center"
      boxShadow="0 0 10px rgba(55, 55, 55, 0.9)"
    >
      <Flex w="100%" justifyContent="center" alignItems="center">
        <Box>
          <Image
            style={{ width: isMobile ? "180px" : "250px", height: "auto" }}
            src={logo}
            width={1600}
            height={"auto"}
            alt=""
          />
        </Box>
        <Flex>
          <Flex columnGap="24" ml="36">
            <IconButton
              background="transparent"
              border="none"
              cursor="pointer"
              onClick={() => {
                window.open(
                  "https://opensea.io/collection/ahegao-nft-official",
                  "_blank"
                );
              }}
              icon={
                <SiOpensea color="#E686FF" size={isMobile ? "24px" : "36px"} />
              }
            />
            <IconButton
              background="transparent"
              border="none"
              cursor="pointer"
              onClick={() => {
                window.open("https://twitter.com/ahegao_nft", "_blank");
              }}
              icon={
                <SiTwitter color="#E686FF" size={isMobile ? "24px" : "36px"} />
              }
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
