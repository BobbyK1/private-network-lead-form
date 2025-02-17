import { Box, Container, Flex, Text } from "@chakra-ui/react";


export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <Flex w="full" h="12" alignItems="center" justify="end">
                <Container>
                    <Text fontSize="sm" textAlign="right">© POMIN, {currentYear}</Text>
                </Container>
            </Flex>
        </>
    )
}