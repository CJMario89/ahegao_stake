import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import aboutImg from "/assets/ahegao_about.png";
import ahegao_about_mobile_1_1 from "/assets/ahegao_about_mobile_1_1.png";
import ahegao_about_mobile_2 from "/assets/ahegao_about_mobile_2.png";

const About = ({ screenWidth }) => {
  return (
    <Box id="about" w="100%" h="auto">
      {screenWidth > 768 ? (
        <Image
          style={{ width: "100%", height: "auto" }}
          width="1920"
          height="auto"
          src={aboutImg}
          alt=""
        />
      ) : (
        <Flex w="full" alignItems="center" flexDirection="column" my="4">
          <Image
            style={{ width: "100%", height: "auto" }}
            src={ahegao_about_mobile_1_1}
            alt=""
          />
          <Image
            style={{ width: "100%", height: "auto" }}
            src={ahegao_about_mobile_2}
            alt=""
          />
        </Flex>
      )}
    </Box>
  );
};

export default About;
