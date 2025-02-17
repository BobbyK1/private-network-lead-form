'use client'

import { Box, Container, Heading, Text } from "@chakra-ui/react"
import Lottie from "lottie-react"
import { Roboto, Roboto_Condensed } from "next/font/google"
import anim from "../components/anim/checkmark.json";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap", 
  weight: ["100", "300", "400", "500", "700", "900"]
})

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export default function Page() {

    return (
        <>
            <Container py="20" className={roboto.className}>
                <Heading as="h1" className={roboto_condensed.className} fontSize="3xl" fontWeight="bold" textAlign="center" textTransform="capitalize">Thank you for your inquiry!</Heading>
                <Box w="80" h="80" mx="auto">
                    <Lottie animationData={anim} loop={false}  />
                </Box>
                <Text fontSize="xl" color="blackAlpha.700" textAlign="center">A member of our team will be in touch soon.</Text>
            </Container>
        </>
    )
}