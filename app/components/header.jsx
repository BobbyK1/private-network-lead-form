import { Box, Container, Flex, Text } from "@chakra-ui/react";


export default function Header() {
    return (
        <>
            <Container>
                <Flex h="20" w="full" alignItems="center">
                    <Text fontSize="xl" fontWeight="bold" className="--font-roboto">Private Off Market Investor Network</Text>
                </Flex>
            </Container>
        </>
    )
}