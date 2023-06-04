import { Button, Container, Flex } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import useConnect from "../../application/useConnect";
import useApprove from "../../application/useApprove";
import useStake from "../../application/useStake";
import useGetAllStake from "../../application/query/useGetAllStake";
import useUnstake from "../../application/useUnstake";
import useGetAllNFT from "../../application/query/useGetAllNFT";

const Staking = () => {
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

  const { connect, disconnect } = useConnect();
  const { mutateAsync } = useApprove();
  const { stake } = useStake();
  const { unstake } = useUnstake();
  const { data, isSuccess, refetch } = useGetAllStake();
  const { refetch: getAllNFT } = useGetAllNFT();
  const { refetch: getAllStake } = useGetAllStake();
  return (
    <Container
      w="100%"
      minH="100vh"
      mt={!isMobile ? "105px" : "56px"}
      overflow="hidden"
    >
      <Flex pl="100px" pt="100px" columnGap="12px">
        <Button
          border="1px solid white"
          borderRadius="16px"
          color="white"
          bgColor="transparent"
          fontSize="20px"
          px="16px"
          py="12px"
          cursor="pointer"
          onClick={() => {
            connect();
          }}
        >
          Connect
        </Button>
        <Button
          border="1px solid white"
          borderRadius="16px"
          color="white"
          bgColor="transparent"
          fontSize="20px"
          px="16px"
          py="12px"
          cursor="pointer"
          onClick={async () => {
            await stake({ tokenId: 5, month: 1 });
          }}
        >
          stake
        </Button>
        <Button
          border="1px solid white"
          borderRadius="16px"
          color="white"
          bgColor="transparent"
          fontSize="20px"
          px="16px"
          py="12px"
          cursor="pointer"
          onClick={async () => {
            await unstake();
          }}
        >
          unstake
        </Button>

        <Button
          border="1px solid white"
          borderRadius="16px"
          color="white"
          bgColor="transparent"
          fontSize="20px"
          px="16px"
          py="12px"
          cursor="pointer"
          onClick={async () => {
            console.log("0x2aAFe71a6B63AC92C337De31EFF4A8BbfF479EAa");
            const d = await getAllStake();
            console.log({ ...d.data });
          }}
        >
          getAllStake
        </Button>

        <Button
          border="1px solid white"
          borderRadius="16px"
          color="white"
          bgColor="transparent"
          fontSize="20px"
          px="16px"
          py="12px"
          cursor="pointer"
          onClick={async () => {
            const response = await getAllNFT();
            console.log(response.data);
          }}
        >
          getAllNFT
        </Button>

        <Button
          border="1px solid white"
          borderRadius="16px"
          color="white"
          bgColor="transparent"
          fontSize="20px"
          px="16px"
          py="12px"
          cursor="pointer"
          onClick={async () => {
            const isApproved = await mutateAsync();
          }}
        >
          Approve
        </Button>
      </Flex>
    </Container>
  );
};

export default Staking;
