import { Box, Flex, IconButton, Link } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { SiOpensea, SiTwitter } from "react-icons/si";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";

const navOptions = [
  {
    title: "ABOUT",
    onClick: () => {
      window.location.href = "/#about";
    },
  },
  {
    title: "STAKING",
    onClick: () => {
      window.location.href = "/#staking";
    },
  },
  {
    title: "ROADMAP",
    onClick: () => {
      window.location.href = "/#roadmap";
    },
  },
  {
    title: "TEAM",
    onClick: () => {
      window.location.href = "/#team";
    },
  },
];

const MobileHamberger = ({
  isHamburgerShow,
  setIsHamburgerShow,
  onClose,
  isMobile,
}) => {
  return (
    <>
      <Flex
        flexDirection="column"
        backgroundColor="black"
        position="fixed"
        py="20px"
        px="24px"
        w="300px"
        height="100vh"
        top="0px"
        right="0px"
        rowGap="36px"
        boxShadow="0 0 10px rgba(55, 55, 55, 0.9)"
        zIndex="1001"
        transform={isHamburgerShow ? "trtranslateX(0)" : "translateX(100%)"}
        transition="all"
        transitionDuration="0.3s"
        transitionTimingFunction="ease-in-out"
      >
        <Box onClick={onClose} cursor="pointer" my={"0px"}>
          <IoMdClose size="28px" color="white" />
        </Box>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          mr="60"
          rowGap="36"
        >
          {navOptions.map((option) => (
            <Link
              key={option.title}
              fontSize={isMobile ? "18px" : "24px"}
              letterSpacing="1px"
              cursor="pointer"
              onClick={() => {
                option.onClick();
                setIsHamburgerShow(false);
              }}
              fontFamily="LucidityExpand"
            >
              {option.title}
            </Link>
          ))}
        </Flex>
        <Flex columnGap="28">
          <IconButton
            background="transparent"
            border="none"
            cursor="pointer"
            onClick={() => {
              window.open(
                "https://opensea.io/collection/ahegao-nft-official",
                "_blank"
              );
            }}
            icon={<SiOpensea color="#E686FF" size="36px" />}
          />
          <IconButton
            background="transparent"
            border="none"
            cursor="pointer"
            onClick={() => {
              window.open("https://twitter.com/ahegao_nft", "_blank");
            }}
            icon={<SiTwitter color="#E686FF" size="36px" />}
          />
        </Flex>
      </Flex>
      <></>
    </>
  );
};

const Header = ({ screenWidth }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [isHamburgerShow, setIsHamburgerShow] = useState(false);
  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(
        e.target.documentElement.scrollTop > scrollTop &&
          e.target.documentElement.scrollTop > 200
      );
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  const isMobile = screenWidth < 1000;
  const router = useRouter();
  return (
    <>
      <Flex
        height="max-content"
        w="100%"
        position="fixed"
        top="0"
        bgColor="rgba(0, 0, 0, 0.7)"
        backdropFilter="blur(30px)"
        py={isMobile ? "15px" : "30px"}
        justifyContent="center"
        boxShadow="0 0 10px rgba(55, 55, 55, 0.9)"
        zIndex="1000"
        style={
          scrolling
            ? {
                transition: "all 0.3s ease-out",
                transform: "translateY(-100%)",
              }
            : {
                transition: "all 0.3s ease-out",
              }
        }
      >
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <Box
            mx="5%"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              style={{ width: isMobile ? "130px" : "250px", height: "auto" }}
              src={logo}
              width={1600}
              height={"auto"}
              alt=""
            />
          </Box>
          {screenWidth > 1380 ? (
            <Flex>
              <Flex
                justifyContent="center"
                alignItems="center"
                columnGap="36"
                mr="60"
              >
                {navOptions.map((option) => (
                  <Link
                    key={option.title}
                    fontSize="24px"
                    letterSpacing="1px"
                    cursor="pointer"
                    onClick={option.onClick}
                    fontFamily="LucidityExpand"
                  >
                    {option.title}
                  </Link>
                ))}
              </Flex>
              <Flex columnGap="36" mr="60">
                <IconButton
                  background="transparent"
                  border="none"
                  cursor="pointer"
                  onClick={() => {
                    window.open(
                      "https://opensea.io/collection/ahegao-nft-official",
                      "_blank"
                    );
                  }}
                  icon={<SiOpensea color="#E686FF" size="36px" />}
                />
                <IconButton
                  background="transparent"
                  border="none"
                  cursor="pointer"
                  onClick={() => {
                    window.open("https://twitter.com/ahegao_nft", "_blank");
                  }}
                  icon={<SiTwitter color="#E686FF" size="36px" />}
                />
              </Flex>
            </Flex>
          ) : (
            <Box
              mr="40px"
              cursor="pointer"
              onClick={() => {
                setIsHamburgerShow(true);
              }}
            >
              <GiHamburgerMenu size="26px" />
            </Box>
          )}
        </Flex>
      </Flex>
      {screenWidth <= 1380 && (
        <MobileHamberger
          isHamburgerShow={isHamburgerShow}
          setIsHamburgerShow={setIsHamburgerShow}
          onClose={() => {
            setIsHamburgerShow(false);
          }}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default Header;
