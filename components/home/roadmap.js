import { Flex, Text } from "@chakra-ui/react";
import Carousel from "./carousel";
import ahegao_roadmap_1 from "/assets/ahegao_roadmap_1.png";
import ahegao_roadmap_2 from "/assets/ahegao_roadmap_2.png";
import ahegao_roadmap_3 from "/assets/ahegao_roadmap_3.png";
import ahegao_roadmap_4 from "/assets/ahegao_roadmap_4.png";
import ahegao_roadmap_5 from "/assets/ahegao_roadmap_5.png";

const Roadmap = ({ isMobile }) => {
  const roadmapImages = [
    ahegao_roadmap_1,
    ahegao_roadmap_2,
    ahegao_roadmap_3,
    ahegao_roadmap_4,
    ahegao_roadmap_5,
  ];
  return (
    <Flex id="roadmap" position="relative" w="100%" h="auto" mb="150px">
      <Flex
        position="relative"
        top="0px"
        left="0px"
        w="100%"
        h="100%"
        flexDirection="column"
      >
        <Text
          fontWeight="800"
          ml="11%"
          mb="10%"
          fontSize={isMobile ? "24px" : "32px"}
          letterSpacing="2px"
          fontFamily="LucidityExpand"
        >
          ROADMAP :{" "}
        </Text>
        <Flex w="100%" height="400px" m="0 auto">
          <Carousel
            w="100%"
            h="100%"
            images={roadmapImages}
            isMobile={isMobile}
          />
        </Flex>
      </Flex>
      {/* <Image
        style={{ width: "100%", height: "auto" }}
        width="1920"
        height="auto"
        src={aboutImg}
        alt=""
      /> */}
    </Flex>
  );
};

export default Roadmap;
