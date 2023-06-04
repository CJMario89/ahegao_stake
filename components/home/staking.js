import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import stakingImg from "/assets/ahegao_staking.png";
import ahegao_staking_mobile_1 from "/assets/ahegao_staking_mobile_1.png";
import ahegao_staking_mobile_2 from "/assets/ahegao_staking_mobile_2.png";

const Staking = ({ screenWidth }) => {
  return (
    <Box id="staking" w="100%" h="auto">
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
