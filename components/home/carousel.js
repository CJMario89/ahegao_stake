import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxDot, RxDotFilled } from "react-icons/rx";
import Slider from "react-slick";

function NextArrow(props) {
  const { onClick, isMobile } = props;
  return (
    <Box
      position="absolute"
      right="17%"
      width="15%"
      top="50%"
      transform="translate(110%, -50%)"
      zIndex="999"
      onClick={onClick}
      cursor="pointer"
    >
      {!isMobile && <FaChevronRight color="gray" size="10%" />}
    </Box>
  );
}

function PrevArrow(props) {
  const { onClick, isMobile } = props;
  return (
    <Box
      position="absolute"
      left="17%"
      width="15%"
      top="50%"
      transform="translate(-25%, -50%)"
      zIndex="999"
      onClick={onClick}
      cursor="pointer"
    >
      {!isMobile && <FaChevronLeft color="gray" size="10%" />}
    </Box>
  );
}

const Carousel = ({ images, isMobile, ...restProps }) => {
  const imageLength = images.length;
  const duplicateImages = [...images, ...images];
  const slider = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(1);
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: !isMobile ? 5 : 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    autoplay: true,
    autoplaySpeed: isMobile ? 4000 : 5000,
    beforeChange: (_, next) => setCarouselIndex(next),
    nextArrow: <NextArrow isMobile={isMobile} />,
    prevArrow: <PrevArrow isMobile={isMobile} />,
  };
  useEffect(() => {
    slider.current.slickGoTo(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slider.current]);
  return (
    <Box position="relative" m="0 auto" {...restProps}>
      <Slider
        ref={(_slider) => {
          slider.current = _slider;
        }}
        {...settings}
      >
        {duplicateImages.map((image, i) => {
          const totalLength = imageLength * 2;
          const mid = (carouselIndex + 2) % totalLength;
          let style = {
            width: "60%",
            height: "auto",
            zIndex: -100,
            opacity: 0,
            display: "none",
            transition: "all 1s ease-out",
          };
          if (mid === i) {
            style = {
              width: isMobile ? "80%" : "100%",
              height: "auto",
              margin: "0 auto",
              zIndex: 500,
              position: "relative",
              transition: "all 1s ease-out",
            };
          }
          if ((mid + totalLength + 1) % totalLength === i) {
            style = {
              width: "90%",
              height: "auto",
              zIndex: 400,
              position: "relative",
              opacity: 0.8,
              transform: "translate(-30%, 5%)",
              transition: "all 1s ease-out",
            };
          }
          if ((mid + totalLength - 1) % totalLength === i) {
            style = {
              width: "90%",
              height: "auto",
              zIndex: 400,
              opacity: 0.8,
              position: "relative",
              transform: "translate(40%, 5%)",
              transition: "all 1s ease-out",
            };
          }
          if ((mid + totalLength + 2) % totalLength === i) {
            style = {
              width: "80%",
              height: "auto",
              zIndex: 300,
              opacity: 0.6,
              position: "relative",
              transform: "translate(-80%, 15%)",
              transition: "all 1s ease-out",
            };
          }
          if ((mid + totalLength - 2) % totalLength === i) {
            style = {
              width: "80%",
              height: "auto",
              zIndex: 300,
              opacity: 0.6,
              position: "relative",
              transform: "translate(100%, 15%)",
              transition: "all 1s ease-out",
            };
          }
          return (
            <Box position="relative" key={i}>
              <Image
                src={image}
                style={
                  !isMobile
                    ? style
                    : { margin: "0 auto", width: "300px", height: "auto" }
                }
                height="auto"
                alt=""
              />
            </Box>
          );
        })}
      </Slider>
      <Flex
        w="50%"
        position="absolute"
        bottom={isMobile ? "-15%" : "-200px"}
        left="50%"
        transform="translateX(-50%)"
        justifyContent="center"
      >
        {Array.from(Array(imageLength)).map((_, i) => {
          return (
            <Box
              key={i}
              mx="2%"
              cursor="pointer"
              onClick={() => {
                slider.current.slickGoTo(
                  carouselIndex >= imageLength ? i + imageLength : i
                );
              }}
            >
              {i === carouselIndex % 5 ? (
                <RxDot size={isMobile ? "24px" : "36px"} />
              ) : (
                <RxDotFilled size={isMobile ? "24px" : "36px"} />
              )}
            </Box>
          );
        })}
      </Flex>
      {/* <IconButton
        position="absolute"
        top="50%"
        left="0px"
        background="transparent"
        border="none"
        p="0"
        outline="none"
        transform="translateY(-50%)"
        cursor="pointer"
        icon={<FaChevronLeft size="5%" color="gray" />}
      />
      <IconButton
        position="absolute"
        top="50%"
        right="0px"
        background="transparent"
        border="none"
        p="0"
        outline="none"
        cursor="pointer"
        transform="translateY(-50%)"
        icon={<FaChevronRight size="5%" color="gray" />}
      /> */}
    </Box>
  );
};

export default Carousel;
