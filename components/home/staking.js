import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Image from "next/image";
import stakingImg from "/assets/ahegao_staking.png";
import ahegao_staking_mobile_1 from "/assets/ahegao_staking_mobile_1.png";
import ahegao_staking_mobile_2 from "/assets/ahegao_staking_mobile_2.png";
import HeaderIcon from "../stake/Header";
import useScreenWidth from "../stake/useScreenWidth";
import MobileHeaderIcon from "../stake/MobileHeader";

const StakeButton = ({ ...restProps }) => {
  const { isMobile } = useScreenWidth();
  return (
    <Button
      w={isMobile ? "200px" : "330px"}
      h={isMobile ? "50px" : "70px"}
      borderRadius="16px"
      fontSize="20px"
      fontWeight="800"
      bgColor="transparent"
      color="rgb(200, 200, 200)"
      borderWidth="0px"
      cursor={"pointer"}
      _hover={{
        filter: "brightness(1.1)",
      }}
      onClick={() => {}}
      {...restProps}
    >
      <Text
        zIndex="1"
        fontSize={isMobile ? "12px" : "20px"}
        letterSpacing="2px"
        fontFamily="LucidityExpand"
        mt="5px"
      >
        Go to stake
      </Text>
      {isMobile ? <MobileHeaderIcon /> : <HeaderIcon />}
    </Button>
  );
};

const Staking = ({ screenWidth }) => {
  const { isMobile } = useScreenWidth();
  return (
    <Box id="staking" w="100%" h="auto" position="relative">
      <StakeButton
        top={isMobile ? "30vw" : "20vw"}
        right={isMobile ? "15vw" : "10vw"}
        position="absolute"
        zIndex={1}
      />
      {screenWidth > 768 ? (
        <Image
          style={{ width: "100%", height: "auto" }}
          width="1920"
          height="auto"
          src={stakingImg}
          alt=""
        />
      ) : (
        <Flex
          w="full"
          alignItems="center"
          flexDirection="column"
          rowGap="4"
          my="4"
        >
          <Image
            style={{ width: "100%", height: "auto" }}
            src={ahegao_staking_mobile_1}
            alt=""
          />
          <Image
            style={{ width: "100%", height: "auto" }}
            src={ahegao_staking_mobile_2}
            alt=""
          />
        </Flex>
      )}
    </Box>
  );
};

export default Staking;
