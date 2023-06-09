import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";

const HintModal = ({ isOpen, onClose, body, isReady, isAlert }) => {
  return (
    <>
      <Flex
        display={isOpen ? "flex" : "none"}
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="300px"
        height="250px"
        flexDirection="column"
        border="1px solid #E686FF"
        bgColor="rgba(230, 134, 255, 0.5)"
        color="#E686FF"
        alignItems="center"
        zIndex={3000}
        borderRadius="16px"
        // color="white"
      >
        <Text fontSize="28px" textAlign="center" my="50px">
          {isReady && !isAlert ? "Success" : body}
        </Text>
        {!isReady && <Spinner boxSize="22px" color="#E686FF" />}
        {isReady && (
          <Button
            borderWidth="0px"
            fontSize="16px"
            px="16px"
            py="8px"
            borderRadius="8px"
            fontWeight="600"
            border="1px solid #E686FF"
            color="#E686FF"
            bgColor="rgba(230, 134, 255, 0.1)"
            _hover={{ bgColor: "rgba(230, 134, 255, 0.3)" }}
            cursor="pointer"
            onClick={async () => {
              const currentChain = await ethereum.request({
                method: "eth_chainId",
              });
              if (Number(currentChain).toString() === "1") {
                onClose();
              }
            }}
          >
            OK
          </Button>
        )}
      </Flex>
      <Box
        display={isOpen ? "block" : "none"}
        bg="rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(25px)"
        position="fixed"
        top="0"
        left="0"
        width="150vw"
        height="150vh"
        zIndex={2000}
      />
    </>
  );
};

export default HintModal;
