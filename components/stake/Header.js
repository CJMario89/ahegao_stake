import { Box, Flex } from "@chakra-ui/react";

const Ball = ({ ...restProps }) => {
  return (
    <Flex
      position="absolute"
      w="6px"
      h="6px"
      borderRadius="50%"
      backgroundColor="#E686FF"
      zIndex={2}
      justifyContent="center"
      alignItems="center"
      {...restProps}
    >
      <Box
        w="2px"
        h="2px"
        borderRadius="50%"
        m="auto"
        backgroundColor="rgba(0, 0, 0, 0.5)"
      />
    </Flex>
  );
};

const HeaderIcon = () => {
  return (
    <Flex position="absolute" top="0px" h="70px" w="350px">
      <Box
        id="pink"
        w="350px"
        h="50px"
        backgroundColor="#E686FF"
        position="absolute"
        top="0"
        left="0"
      />
      <Box
        id="pink"
        w="350px"
        h="0"
        borderTop="20px solid #E686FF"
        borderRight="30px solid transparent"
        position="absolute"
        top="50px"
        left="0px"
      />
      <Box
        id="pink"
        w="3px"
        h="50px"
        position="absolute"
        backgroundColor="#E686FF"
        top="10px"
        left="10px"
        zIndex={1}
      />

      <Box
        id="mask"
        w="338px"
        h="46px"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        position="absolute"
        top="2px"
        left="10px"
      />
      <Box
        id="mask"
        w="338px"
        h="0"
        borderTop="20px solid rgba(0, 0, 0, 0.5)"
        borderRight="30px solid transparent"
        position="absolute"
        top="48px"
        left="10px"
      />
      <Ball right="7px" top="10px" />
      <Ball right="7px" top="20px" />
    </Flex>
  );
};

export default HeaderIcon;
