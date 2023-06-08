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
import useScreenWidth from "./useScreenWidth";

const pinkFontStyle = {
  color: "#E686FF",
  fontSize: "20px",
  fontWeight: "600",
};

const Index = () => {
  const { isMobile, screenWidth } = useScreenWidth();
  const { account, status } = useContext(AccountContext);
  const { connect } = useConnect();
  const [isAvailable, setIsAvailable] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState(-1);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedNfts, setSelectedNfts] = useState([]);
  const [submitNfts, setSubmitNfts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [month, setMonth] = useState(1);
  const [level, setLevel] = useState(1);
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
    nfts: submitNfts,
    month: submitNfts[0]?.month,
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
      setSelectedNfts([]);
      setSubmitNfts([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakingResult, unstakingResult]);
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
    if (window?.ethereum) {
      window.ethereum.on("chainChanged", change);
    }
  }, []);
  console.log(submitNfts);

  return (
    <>
      {isAvailable ? (
        <Container
          maxW="1440px"
          m="0 auto"
          pt={isMobile ? "100px" : "150px"}
          mb="86px"
        >
          <Flex
            w="100%"
            columnGap="30px"
            justifyContent="center"
            flexDirection={isMobile ? "column" : "row"}
            rowGap="50px"
          >
            <Flex flexDirection="column" alignItems="center">
              <Flex
                position="relative"
                w="330px"
                flexDirection="column"
                justifyContent="center"
              >
                <Image src={total_header.src} alt="" />
                <Text
                  position="absolute"
                  top="35px"
                  left="31px"
                  zIndex={2}
                  fontSize="30px"
                  color="#E686FF"
                  fontWeight="1000"
                  m="0"
                >
                  {totalStake ?? 0}
                </Text>
              </Flex>
              <Flex
                mt={isMobile ? "30px" : "50px"}
                position="relative"
                w="400px"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Image w="330px" src={staking_header.src} alt="" />
                <Flex
                  flexDirection="column"
                  rowGap="10px"
                  w="100%"
                  position="relative"
                >
                  {Array.isArray(stakes) && stakes.length > 0 && (
                    <Flex>
                      <Input
                        ml="45px"
                        type="checkbox"
                        onInput={(e) => {
                          if (e.target.checked) {
                            document
                              .querySelectorAll(".unstake")
                              .forEach((dom) => (dom.checked = "checked"));
                          } else {
                            document
                              .querySelectorAll(".unstake")
                              .forEach((dom) => (dom.checked = false));
                          }
                        }}
                      />
                      <Text {...pinkFontStyle} ml="15px">
                        Select All
                      </Text>
                    </Flex>
                  )}
                  {Array.isArray(stakes) &&
                    stakes.length > 0 &&
                    stakes.map(({ tokenId, endTime, media }, i) => {
                      const canUnlock =
                        Date.now() > new Date(Date.parse(endTime));
                      const image = media[0]?.thumbnail ?? media[0]?.gateway;
                      return (
                        <Flex key={i} alignItems="center" w="100%">
                          <Input
                            className="unstake"
                            type="checkbox"
                            ml="45px"
                          />
                          <Image
                            src={image}
                            width="50px"
                            height="50px"
                            ml="10px"
                            alt=""
                          />
                          <Text
                            color="#E686FF"
                            fontSize="20px"
                            ml="10px"
                            fontWeight="600"
                            w="50px"
                          >
                            #{tokenId}
                          </Text>

                          <Text
                            color="#E686FF"
                            w="100px"
                            ml="30px"
                            fontSize="20px"
                            fontWeight="600"
                            flexShrink="0"
                          >
                            {new Date(Date.parse(endTime)).toLocaleString()}
                          </Text>
                          {/* {canUnlock && (
                            <Text ml="55px" {...pinkFontStyle}>
                              Available
                            </Text>
                          )} */}
                        </Flex>
                      );
                    })}
                  <Button
                    borderWidth="0px"
                    fontSize="20px"
                    mt="20px"
                    px="16px"
                    py="8px"
                    borderRadius="8px"
                    fontWeight="600"
                    border="1px solid #E686FF"
                    color="#E686FF"
                    bgColor="rgba(230, 134, 255, 0.5)"
                    alignSelf="center"
                    cursor="pointer"
                    onClick={() => {
                      const checks = Array.from(
                        document.querySelectorAll(".unstake")
                      ).map((dom) => dom.checked);
                      if (checks.every((check) => !check)) {
                        return;
                      }
                      const unstakes = stakes.filter((stake, i) => {
                        return checks[i];
                      });
                      unstake({ unstakes });
                      setIsOpen(true);
                      setModalBody("Unlock your Ahegao...");
                    }}
                  >
                    Unlock
                  </Button>
                </Flex>
              </Flex>
              <Flex
                mt={isMobile ? "30px" : "50px"}
                position="relative"
                w="400px"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Image w="330px" src={choose_block.src} alt="" />
                <Flex
                  w="263px"
                  h="254px"
                  left="64px"
                  top="81px"
                  pl="10px"
                  py="10px"
                  position="absolute"
                  flexDirection="column"
                  rowGap="10px"
                  overflow="auto"
                >
                  {Array.isArray(allNFTs) && allNFTs.length > 0 && (
                    <Flex>
                      <Input
                        type="checkbox"
                        onInput={(e) => {
                          if (e.target.checked) {
                            setSelectedNfts(
                              allNFTs.map(({ media, tokenId, rawMetadata }) => {
                                const image =
                                  media[0]?.thumbnail ?? media[0]?.gateway;
                                const attributes = rawMetadata.attributes;
                                let _level = 1;
                                attributes.forEach((attribute) => {
                                  if (attribute.trait_type === "Font") {
                                    if (attribute.value !== "Empty") {
                                      _level = 2;
                                    }
                                  }
                                  if (
                                    attribute.trait_type === "Special Edition"
                                  ) {
                                    _level = 3;
                                  }
                                });
                                return {
                                  tokenId: tokenId,
                                  image: image,
                                  level: _level,
                                };
                              })
                            );
                            document
                              .querySelectorAll(".stake")
                              .forEach((dom) => (dom.checked = "checked"));
                          } else {
                            setSelectedNfts([]);
                            document
                              .querySelectorAll(".stake")
                              .forEach((dom) => (dom.checked = false));
                          }
                        }}
                      />
                      <Text {...pinkFontStyle} ml="15px">
                        Select All
                      </Text>
                    </Flex>
                  )}
                  {Array.isArray(allNFTs) &&
                    allNFTs.length > 0 &&
                    allNFTs.map(({ media, tokenId, rawMetadata }) => {
                      const image = media[0]?.thumbnail ?? media[0]?.gateway;
                      const attributes = rawMetadata.attributes;
                      let _level = 1;
                      attributes.forEach((attribute) => {
                        if (attribute.trait_type === "Font") {
                          if (attribute.value !== "Empty") {
                            _level = 2;
                          }
                        }
                        if (attribute.trait_type === "Special Edition") {
                          _level = 3;
                        }
                      });
                      return (
                        <Flex key={tokenId} alignItems="center">
                          <Input
                            className="stake"
                            type="checkbox"
                            onInput={(e) => {
                              if (e.target.checked) {
                                setSelectedNfts([
                                  ...selectedNfts,
                                  {
                                    tokenId: tokenId,
                                    image: image,
                                    level: _level,
                                  },
                                ]);
                              } else {
                                setSelectedNfts((prev) =>
                                  prev.filter((p) => p.tokenId !== tokenId)
                                );
                              }
                            }}
                          />
                          <Image
                            src={image}
                            ml="15px"
                            width="50px"
                            height="50px"
                            alt=""
                          />
                          <Text ml="30px" {...pinkFontStyle}>
                            #{tokenId}
                          </Text>
                          <Text ml="60px" {...pinkFontStyle} fontSize="16px">
                            {selectedNfts
                              .map((selectedNft) => selectedNft.tokenId)
                              .includes(tokenId) && "Select"}
                          </Text>
                        </Flex>
                      );
                    })}
                </Flex>
                <Text
                  position="absolute"
                  left="128px"
                  bottom="119px"
                  fontWeight="800"
                  color="rgb(200, 200, 200)"
                  fontSize="12px"
                >
                  {month} month{month !== "1" ? "s" : ""}
                </Text>
                <Text
                  position="absolute"
                  left="230px"
                  bottom="119px"
                  fontWeight="800"
                  color="rgb(200, 200, 200)"
                  fontSize="12px"
                >
                  {getWeight(month)}
                </Text>
                <Input
                  type="range"
                  min="1"
                  step="1"
                  max="12"
                  position="absolute"
                  width="260px"
                  left="57px"
                  bottom="90px"
                  value={month}
                  onInput={(e) => {
                    setMonth(e.target.value);
                  }}
                />
                <Image
                  _hover={{ transform: "scale(1.05)" }}
                  cursor="pointer"
                  position="absolute"
                  bottom="40px"
                  left="56px"
                  width="180px"
                  src={confirm_button.src}
                  alt=""
                  onClick={() => {
                    if (isMobile) {
                      document
                        .querySelector("#confirm")
                        .scrollIntoView({ behavior: "smooth" });
                    }
                    const nfts = selectedNfts.map((selectedNft) => {
                      return {
                        ...selectedNft,
                        month,
                        total: caculatePoint(month, selectedNft.level),
                        point: caculateMonthPoint(month, selectedNft.level),
                        weight: getWeight(month),
                      };
                    });
                    setSubmitNfts(
                      nfts.sort((a, b) => {
                        return Number(a.tokenId) - Number(b.tokenId);
                      })
                    );
                  }}
                />
              </Flex>
            </Flex>
            <Flex flexDirection="column" alignItems="center" id="confirm">
              <Flex
                position="relative"
                w="330px"
                flexDirection="column"
                justifyContent="center"
              >
                <Image src={supply_rate_header.src} alt="" />
                <Text
                  position="absolute"
                  top="35px"
                  left="31px"
                  zIndex={2}
                  fontSize="30px"
                  color="#E686FF"
                  fontWeight="1000"
                  m="0"
                >
                  {totalNFT ? ((totalStake / totalNFT) * 100).toFixed(2) : 0} %
                </Text>
              </Flex>
              <Flex
                mt={isMobile ? "30px" : "50px"}
                position="relative"
                w="330px"
                flexDirection="column"
                justifyContent="center"
              >
                <Image src={approve_block.src} alt="" />
                {Array.isArray(submitNfts) && submitNfts.length > 0 && (
                  <Flex
                    w="246px"
                    h="224px"
                    left="27px"
                    top="121px"
                    position="absolute"
                    flexDirection="column"
                    alignItems="center"
                    columnGap="20px"
                    pl="5px"
                    overflow="auto"
                    rowGap={"15px"}
                    overflowX="hidden"
                    {...pinkFontStyle}
                  >
                    {submitNfts.map((selectedNft, i) => {
                      return (
                        <Flex
                          key={i}
                          alignItems="center"
                          w="100%"
                          columnGap="12px"
                        >
                          <Text>#{selectedNft.tokenId}</Text>
                          <Image
                            width="50px"
                            height="50px"
                            src={selectedNft.image}
                            alt=""
                          />
                          <Flex
                            flexDirection="column"
                            fontSize="14px"
                            whiteSpace="nowrap"
                          >
                            <Text>Month: {selectedNft.month}</Text>
                            <Text>Weight: {selectedNft.weight}</Text>
                          </Flex>
                          <Text fontSize="14px" ml="10px">
                            Point: {selectedNft.total}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                )}
                {Array.isArray(submitNfts) && submitNfts.length > 0 && (
                  <Flex
                    w="245px"
                    h="23px"
                    left="30px"
                    top="389px"
                    position="absolute"
                    alignItems="center"
                    pl="5px"
                    {...pinkFontStyle}
                  >
                    <Text fontSize="14px">
                      {submitNfts.reduce(
                        (accu, submitNft) => accu + submitNft.point,
                        0
                      )}
                    </Text>
                  </Flex>
                )}
                <Image
                  _hover={{ transform: "scale(1.05)" }}
                  cursor="pointer"
                  position="absolute"
                  bottom="38px"
                  left="66px"
                  width="180px"
                  src={approve_button.src}
                  alt=""
                  onClick={() => {
                    if (submitNfts.length <= 0) {
                      return;
                    }
                    approve();
                    setIsOpen(true);
                    setModalBody("Staking your Ahegao...");
                  }}
                />
              </Flex>
              <Flex
                flexDirection="column"
                p="10px"
                {...pinkFontStyle}
                fontSize="14px"
              >
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
            w="330px"
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
