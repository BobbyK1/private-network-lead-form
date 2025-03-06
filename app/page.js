import { Box, Button, Container, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Roboto, Roboto_Condensed } from 'next/font/google'
import Link from "next/link";
import BuyerForm from "./components/buyer-form";
import SellerForm from "./components/seller-form";
import LeadTypeChoice from "./components/lead-type-choice";

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

export default function Home({ searchParams }) {

	const tenant = searchParams.tenant || 'default';

	return (
		<Box className={roboto.className} >
			<Container>
				<Flex direction="row" py="20" mx="auto" maxW="4xl">
					<Box>
						<Heading as="h1" className={roboto_condensed.className} fontWeight="bold" fontSize="5xl" lineHeight="1.2em" textTransform="capitalize">We connect off-market Buyers and Sellers</Heading>

						<Text fontSize="2xl" mt="10">Everything we do is personal connections, not automated lists. We're real local people who actually know about the area. <br /> <br /> Join our private network to grow your real estate portfolio.</Text>

						<Button as={Link} href="#get-started" w={["fit-content"]} size="lg" mt="10" px="14" fontSize="xl">Get Started</Button>
					</Box>
				</Flex>
			</Container>
			<Box w="full" py="20" bgColor="gray.50">
				<Container>
					<Heading as="h2" className={roboto_condensed.className} fontSize="4xl" fontWeight="bold" textTransform="capitalize" textAlign="center">Join Our Network Now</Heading>
					<Container maxW="3xl" mt="10">
						{tenant === "buyer" ? <BuyerForm /> : tenant === "seller" ? <SellerForm /> : <LeadTypeChoice />}
					</Container>
				</Container>
			</Box>
		</Box>
	);
}
