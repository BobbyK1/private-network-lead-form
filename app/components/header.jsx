import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { Roboto_Condensed } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})  


export default function Header() {
    return (
        <>
            <Container>
                <Flex h="20" w="full" alignItems="center">
                    <Text fontSize="xl" fontWeight="bold" className={roboto_condensed.className} textTransform="uppercase">Private Off Market Investor Network</Text>
                </Flex>
            </Container>
        </>
    )
}