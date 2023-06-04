import { Box, Button, Flex, Text } from "@chakra-ui/react";

const HintModal = ({ isOpen, onClose, body, isReady }) => {
  return (
    <Flex display={isOpen ? "block" : "none"} width="300px" height="250px">
      <Text>{isReady ? "Success" : body}</Text>
      {isReady && <Button onClick={onClose()}>OK</Button>}
    </Flex>
  );
};

export default HintModal;
