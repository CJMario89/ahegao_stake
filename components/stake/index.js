import {
  Button,
  Container,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import approve_block from "/assets/approve_block.png";
import approve_button from "/assets/approve_button.png";
import choose_block from "/assets/choose_block.png";
import confirm_button from "/assets/confirm_button.png";
import staking_header from "/assets/staking_header.png";
import supply_rate_header from "/assets/supply_rate_header.png";
import total_header from "/assets/total_header.png";
import useGetNFTInfo from "../../application/query/useGetNFTInfo";
import useConnect from "../../application/useConnect";
import { useContext, useEffect, useState } from "react";
import useGetTotalStake from "../../application/query/useGetTotalStake";
import useGetTotalNFT from "../../application/query/useGetTotalNFT";
import useGetAllStake from "../../application/query/useGetAllStake";
import useGetAllNFT from "../../application/query/useGetAllNFT";
import {
  caculateMonthPoint,
  caculatePoint,
  getWeight,
} from "../../utils/caculatePoint";
import { AccountContext } from "../../pages/_app";
import HeaderIcon from "./Header";
import useApprove from "../../application/useApprove";
import useStake from "../../application/useStake";
import useUnstake from "../../application/useUnstake";
import useGetUserPoint from "../../application/query/useGetUserPoint";
import HintModal from "./HintModal";

const pinkFontStyle = {
  color: "#E686FF",
  fontSize: "20px",
  fontWeight: "600",
};

const Index = () => {
  const { account, status } = useContext(AccountContext);
  const { connect } = useConnect();
  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState(-1);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedNft, setSelectedNft] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [month, setMonth] = useState(1);
  // const { data } = useGetNFTInfo("1", {
  //   enable: isAvailable,
  // });
  const { data: totalStake, refetch: getTotalStake } = useGetTotalStake();
  const { data: totalNFT, refetch: getTotalNFT } = useGetTotalNFT();
  const { data: stakes, refetch: getAllStake } = useGetAllStake();
  const { data: allNFTs, refetch: getAllNFT } = useGetAllNFT();
  const { data: point, refetch: getUserPoint } = useGetUserPoint();
  const {
    mutate: approve,
    data: isApproved,
    isError: isApprovedError,
  } = useApprove();
  const {
    mutate: stake,
    data: stakingResult,
    isError: isStakeError,
  } = useStake({
    tokenId: selectedNft.tokenId,
    month: selectedNft.month,
  });
  const {
    mutate: unstake,
    data: unstakingResult,
    isError: isUnstakeError,
  } = useUnstake();
  useEffect(() => {
    if (isApprovedError) {
      setModalBody("");
      setIsOpen(false);
      setIsReady(false);
    }
  }, [isApprovedError]);
  useEffect(() => {
    if (isStakeError) {
      setModalBody("");
      setIsOpen(false);
      setIsReady(false);
    }
  }, [isStakeError]);
  useEffect(() => {
    if (isUnstakeError) {
      setModalBody("");
      setIsOpen(false);
      setIsReady(false);
    }
  }, [isUnstakeError]);
  useEffect(() => {
    (async () => {
      if (isApproved) {
        try {
          stake();
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [isApproved, stake]);
  console.log(stakes?.endTime);
  console.log(new Date(Date.parse(stakes?.stakingEndDate)).toLocaleString());
  useEffect(() => {
    if (stakingResult) {
      console.log(stakingResult);
      getTotalStake();
      getAllStake();
      getAllNFT();
      getTotalNFT();
      setSelectedNft({});
      setSelectedTokenId(-1);
      setSelectedImage("");
      setIsReady(true);
    }
    if (unstakingResult) {
      console.log(unstakingResult);
      getTotalStake();
      getAllStake();
      getAllNFT();
      getTotalNFT();
      getUserPoint();
      setIsReady(true);
    }
  }, [
    getAllNFT,
    getAllStake,
    getTotalNFT,
    getTotalStake,
    getUserPoint,
    stakingResult,
    unstakingResult,
  ]);
  console.log(allNFTs);
  console.log(stakes);
  console.log(totalNFT);
  useEffect(() => {
    if (status === "isConnected") {
      setIsAvailable(true);
    }
    if (status !== "isConnected") {
      setIsAvailable(false);
    }
  }, [status]);
  useEffect(() => {
    const change = (chainId) => {
      if (chainId.toString() !== "80001") {
        setModalBody("Wrong chain. Please switch to Mumbai");
        setIsAlert(true);
        setIsReady(true);
        setIsOpen(true);
      }
    };
    window.ethereum.on("chainChanged", change);
  }, []);
  return (
    <>
      {isAvailable ? (
        <Container maxW="1440px" m="0 auto" pt="150px" mb="86px">
          <Flex w="100%" columnGap="50px" justifyContent="center">
            <Flex flexDirection="column">
              <Flex
                position="relative"
                w="450px"
                flexDirection="column"
                justifyContent="center"
              >
                <Image src={total_header.src} alt="" />
                <Text
                  position="absolute"
                  top="43px"
                  left="43px"
                  zIndex={2}
                  fontSize="46px"
                  color="#E686FF"
                  fontWeight="1000"
                  m="0"
                >
                  {totalStake ?? 0}
                </Text>
              </Flex>
              <Flex
                mt="50px"
                position="relative"
                w="450px"
                flexDirection="column"
                justifyContent="center"
              >
                <Image w="400px" src={staking_header.src} alt="" />
                <Flex flexDirection="column" rowGap="10px">
                  {Array.isArray(stakes) &&
                    stakes.length > 0 &&
                    stakes.map(({ tokenId, endTime }, i) => {
                      return (
                        <Flex key={i} alignItems="center">
                          <Text
                            color="#E686FF"
                            fontSize="20px"
                            ml="97px"
                            fontWeight="600"
                          >
                            #{tokenId}
                          </Text>
                          <Text
                            color="#E686FF"
                            w="100px"
                            fontSize="20px"
                            fontWeight="600"
                            ml="108px"
                            flexShrink="0"
                          >
                            {new Date(Date.parse(endTime)).toLocaleString()}
                          </Text>
                          <Button
                            ml="20px"
                            borderWidth="0px"
                            fontSize="16px"
                            px="16px"
                            py="8px"
                            borderRadius="8px"
                            fontWeight="600"
                            border="1px solid #E686FF"
                            color="#E686FF"
                            bgColor="rgba(230, 134, 255, 0.5)"
                            cursor="pointer"
                            onClick={() => {
                              unstake({ tokenId });
                              setIsOpen(true);
                              setModalBody("Unlock your NFT...");
                            }}
                          >
                            Unlock
                          </Button>
                        </Flex>
                      );
                    })}
                </Flex>
              </Flex>
              <Flex
                mt="50px"
                position="relative"
                w="450px"
                flexDirection="column"
                justifyContent="center"
              >
                <Image w="400px" src={choose_block.src} alt="" />
                <Flex
                  w="310px"
                  h="300px"
                  left="48px"
                  top="100px"
                  position="absolute"
                  flexDirection="column"
                  rowGap="10px"
                  overflow="auto"
                >
                  {Array.isArray(allNFTs) &&
                    allNFTs.length > 0 &&
                    allNFTs.map(({ media, tokenId }) => {
                      return (
                        <Flex key={tokenId} alignItems="center">
                          <Input
                            type="checkbox"
                            checked={selectedTokenId === tokenId}
                            onInput={() => {
                              if (selectedTokenId === tokenId) {
                                setSelectedTokenId(-1);
                                setSelectedImage("");
                              } else {
                                setSelectedTokenId(tokenId);
                                setSelectedImage(media[0]?.thumbnail);
                              }
                            }}
                          />
                          <Image
                            src={media[0]?.thumbnail}
                            ml="15px"
                            width="50px"
                            height="50px"
                            alt=""
                          />
                          <Text ml="60px" {...pinkFontStyle}>
                            #{tokenId}
                          </Text>
                          <Text ml="75px" {...pinkFontStyle}>
                            {selectedTokenId === tokenId && "Select"}
                          </Text>
                        </Flex>
                      );
                    })}
                </Flex>
                <Text
                  position="absolute"
                  left="111px"
                  bottom="144px"
                  fontWeight="800"
                  color="rgb(200, 200, 200)"
                >
                  {month} month{month !== "1" ? "s" : ""}
                </Text>
                <Text
                  position="absolute"
                  left="240px"
                  bottom="144px"
                  fontWeight="800"
                  color="rgb(200, 200, 200)"
                >
                  {getWeight(month)}
                </Text>
                <Input
                  type="range"
                  min="1"
                  step="1"
                  max="12"
                  position="absolute"
                  width="325px"
                  left="28px"
                  bottom="113px"
                  value={month}
                  onInput={(e) => {
                    setMonth(e.target.value);
                  }}
                />
                <Image
                  _hover={{ transform: "scale(1.05)" }}
                  cursor="pointer"
                  position="absolute"
                  bottom="33px"
                  left="28px"
                  width="200px"
                  src={confirm_button.src}
                  alt=""
                  onClick={() => {
                    setSelectedNft({
                      tokenId: selectedTokenId,
                      image: selectedImage,
                      month,
                      total: caculatePoint(month, 1),
                      point: caculateMonthPoint(month, 1),
                      weight: getWeight(month),
                    });
                  }}
                />
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Flex
                position="relative"
                w="450px"
                flexDirection="column"
                justifyContent="center"
              >
                <Image src={supply_rate_header.src} alt="" />
                <Text
                  position="absolute"
                  top="43px"
                  left="43px"
                  zIndex={2}
                  fontSize="46px"
                  color="#E686FF"
                  fontWeight="1000"
                  m="0"
                >
                  {totalNFT ? ((totalStake / totalNFT) * 100).toFixed(2) : 0} %
                </Text>
              </Flex>
              <Flex
                mt="50px"
                position="relative"
                w="450px"
                flexDirection="column"
                justifyContent="center"
              >
                <Image src={approve_block.src} alt="" />
                {selectedNft.tokenId >= 0 && (
                  <Flex
                    w="333px"
                    h="66px"
                    left="40px"
                    top="136px"
                    position="absolute"
                    alignItems="center"
                    columnGap="20px"
                    pl="10px"
                    {...pinkFontStyle}
                  >
                    <Text>#{selectedNft.tokenId}</Text>
                    <Image
                      width="50px"
                      height="50px"
                      src={selectedNft.image}
                      alt=""
                    />
                    <Flex flexDirection="column">
                      <Text>Month: {selectedNft.month}</Text>
                      <Text>Weight: {selectedNft.weight}</Text>
                    </Flex>
                    <Text>Point: {selectedNft.total}</Text>
                  </Flex>
                )}
                {selectedNft.tokenId >= 0 && (
                  <Flex
                    w="333px"
                    h="30px"
                    left="40px"
                    top="264px"
                    position="absolute"
                    alignItems="center"
                    pl="10px"
                    {...pinkFontStyle}
                  >
                    <Text>{selectedNft.point}</Text>
                  </Flex>
                )}
                <Image
                  _hover={{ transform: "scale(1.05)" }}
                  cursor="pointer"
                  position="absolute"
                  bottom="55px"
                  left="115px"
                  width="200px"
                  src={approve_button.src}
                  alt=""
                  onClick={() => {
                    approve();
                    setIsOpen(true);
                    setModalBody("Staking your NFT...");
                  }}
                />
              </Flex>
              <Flex flexDirection="column" p="10px" {...pinkFontStyle}>
                <Text>Account:</Text>
                <Text>{account}</Text>
                <Text>Point: {point}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      ) : (
        <Flex
          maxW="1440px"
          m="auto"
          h="calc(100vh - 106px)"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            w="350px"
            h="70px"
            borderRadius="16px"
            fontSize="20px"
            fontWeight="800"
            bgColor="transparent"
            color="rgb(200, 200, 200)"
            borderWidth="0px"
            cursor={status === "isConnecting" ? "default" : "pointer"}
            _hover={{
              filter:
                status === "isConnecting" ? "brightness(1)" : "brightness(1.1)",
            }}
            onClick={connect}
            isDisabled={status === "isConnecting"}
          >
            {status === "isConnecting" ? (
              <Flex zIndex="1" alignItems="center" columnGap="16">
                <Text fontSize="18px">Check on your Metamask</Text>
                <Spinner boxSize="16px" />
              </Flex>
            ) : (
              <Text zIndex="1">Connect with Metamask</Text>
            )}
            <HeaderIcon />
          </Button>
        </Flex>
      )}
      <HintModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setIsReady(false);
          setIsAlert(false);
        }}
        body={modalBody}
        isReady={isReady}
        isAlert={isAlert}
      />
    </>
  );
};

export default Index;
