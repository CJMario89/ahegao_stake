import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import ahegao_team from "/assets/ahegao_team.png";
import ahegao_team_mobile from "/assets/ahegao_team_mobile.png";

const Team = ({ screenWidth, isMobile }) => {
  return (
    <Box id="team" w="100%" h="auto" mb="100px">
      <Text
        fontWeight="800"
        ml="11%"
        pt="10%"
        fontSize={isMobile ? "24px" : "32px"}
        letterSpacing="2px"
        fontFamily="LucidityExpand"
      >
        TEAM :{" "}
      </Text>
      {screenWidth > 768 ? (
        <Image
          style={{ width: "100%", height: "auto" }}
          width="1920"
          height="auto"
          src={ahegao_team}
          alt=""
        />
      ) : (
        <Image
          style={{ width: "100%", height: "auto" }}
          width="1920"
          height="auto"
          src={ahegao_team_mobile}
          alt=""
        />
      )}
    </Box>
  );
};

export default Team;
