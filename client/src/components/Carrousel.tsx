import {
    Box,
    IconButton,
    useBreakpointValue,
    Stack,
    Heading,
    Text,
    Container,
} from "@chakra-ui/react";
import React from "react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

// Settings for the slider
const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const Carrousel = () => {
    // As we have used custom buttons, we need a reference variable to
    // change the state
    const [slider, setSlider] = React.useState<Slider | null>(null);

    // These are the breakpoints which changes the position of the
    // buttons as the screen size changes
    const top = useBreakpointValue({ base: "90%", md: "50%" });
    const side = useBreakpointValue({ base: "30%", md: "40px" });

    // This list contains all the data for carousels
    // This can be static or loaded from a server
    const cards = [
        {
            title: "Promoción en guitarras",
            text: "Aprovecha nuestra promoción en guitarras electro-acusticas carca Fender",
            image: "https://images.unsplash.com/photo-1601956349582-ba50bedaa8ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
            title: "Nuevas clasicas",
            text: "Nuevas guitarras clasicas/españolas para principiantes",
            image: "https://images.unsplash.com/photo-1540535717653-c55c21af74fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
            title: "NEW FENDER COLLECTION",
            text: "Nueva colección de guitaras Fender Signature de alta calidad",
            image: "https://cdn.pixabay.com/photo/2017/11/07/00/22/guitar-2925282_960_720.jpg",
        },
        {
            title: "Organetas y teclados",
            text: "Todo tipo de teclados, organetas y controladores MIDI",
            image: "https://images.unsplash.com/photo-1601312378427-822b2b41da35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        },
    ];

    return (
        <Box
            position={"relative"}
            height={"800px"}
            width={"full"}
            overflow={"hidden"}
        >
            {/* CSS files for react-slick */}
            <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            {/* Left Icon */}
            <IconButton
                aria-label="left-arrow"
                position="absolute"
                left={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={() => slider?.slickPrev()}
            >
                <BiLeftArrowAlt size="40px" />
            </IconButton>
            {/* Right Icon */}
            <IconButton
                aria-label="right-arrow"
                position="absolute"
                right={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={() => slider?.slickNext()}
            >
                <BiRightArrowAlt size="40px" />
            </IconButton>
            {/* Slider */}
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {cards.map((card, index) => (
                    <Box
                        key={index}
                        height={"6xl"}
                        backgroundSize="contain"
                        backgroundImage={`url(${card.image})`}
                    >
                        {/* This is the block you need to change, to customize the caption */}
                        <Box w={"full"} height="600px" position="relative">
                            <div className="absolute left-6 top-6 bg-[#FFCF9B] bg-opacity-50 font-bold text-6xl p-4 text-white">
                                NOVEDADES
                            </div>
                            <Stack
                                spacing={6}
                                w={"full"}
                                maxW={"lg"}
                                position="absolute"
                                right={6}
                                bottom={12}
                                bgColor={"#FFCF9B80"}
                                p={4}
                            >
                                <Heading
                                    fontSize={{
                                        base: "xl",
                                        md: "2xl",
                                        lg: "3xl",
                                    }}
                                    textColor={"white"}
                                >
                                    {card.title}
                                </Heading>
                                <Text
                                    fontSize={{ base: "md", lg: "lg" }}
                                    textColor={"white"}
                                >
                                    {card.text}
                                </Text>
                            </Stack>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default Carrousel;
