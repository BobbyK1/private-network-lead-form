'use client'

import { Box, Button, Container, createListCollection, Flex, Heading, Image, Input, Separator, SimpleGrid, Text } from "@chakra-ui/react";
import { Roboto, Roboto_Condensed } from 'next/font/google'
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "./components/ui/select";
import Link from "next/link";

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

const locations = createListCollection({
	items: [
		{ label: "Northwest Indiana", value: "Northwest Indiana" },
		{ label: "Lake County", value: "Lake County" },
		{ label: "Porter County", value: "Porter County"}
	]
})

const municipalities = createListCollection({
	items: [
		{ label: "Beverly Shores", value: "Beverly Shores" },
		{ label: "Cedar Lake", value: "Cedar Lake" },
		{ label: "Chesterton", value: "Chesterton" },
		{ label: "Crown Point", value: "Crown Point" },
		{ label: "Dyer", value: "Dyer" },
		{ label: "Gary", value: "Gary" },
		{ label: "East Chicago", value: "East Chicago" },
		{ label: "Griffith", value: "Griffith" },
		{ label: "Hammond", value: "Hammond" },
		{ label: "Hebron", value: "Hebron" },
		{ label: "Highland", value: "Highland" },
		{ label: "Hobart", value: "Hobart" },
		{ label: "Kouts", value: "Kouts" },
		{ label: "Lake Station", value: "Lake Station" },
		{ label: "Lowell", value: "Lowell" },
		{ label: "Merrillville", value: "Merrillville" },
		{ label: "Miller’s Beach", value: "Miller’s Beach" },
		{ label: "Munster", value: "Munster" },
		{ label: "Portage", value: "Portage" },
		{ label: "Schererville", value: "Schererville" },
		{ label: "Schneider", value: "Schneider" },
		{ label: "Shelby", value: "Shelby" },
		{ label: "St John", value: "St John" },
		{ label: "Valparaiso", value: "Valparaiso" },
		{ label: "Wheeler", value: "Wheeler" },
		{ label: "Whiting", value: "Whiting" }
	]
})

const finances = createListCollection({
	items: [
		{ label: "Cash", value: "Cash" },
		{ label: "Loan", value: "Loan" },
		{ label: "Seller Financing", value: "Seller Financing" }
	]
})
  

export default function Home() {
	return (
		<Box className={roboto.className} >
			<Container>
				<Flex direction="row" py="20">
					<SimpleGrid columns={[1, 1, 1, 2]} gap="10" alignItems="center">
						<Box>
							<Heading as="h1" className={roboto_condensed.className} fontWeight="bold" fontSize="5xl" lineHeight="1.2em">Transform Your Commercial Buying Experience With Our Private Network</Heading>

							<Text fontSize="2xl" mt="10">Get access to the best resources to aid in your buying needs.</Text>

							<Button as={Link} href="#get-started" w={["full", "full", "full", "fit-content"]} size="lg" mt="10" px="14" fontSize="xl">Get Started</Button>
						</Box>
						<Box>
							<Image src="/network.svg" />
						</Box>
					</SimpleGrid>
				</Flex>
			</Container>
			<Box w="full" py="20" bgColor="gray.50">
				<Container>
					<Heading as="h2" className={roboto_condensed.className} fontSize="4xl" fontWeight="bold" textTransform="capitalize" textAlign="center">Secure your place in our network</Heading>
					<Container maxW="3xl" mt="10">
						<form id="get-started">
							<SimpleGrid columns={[1, 1, 2]} gap="5">
								<Input type="text" outline="none" name="first_name" placeholder="First Name *" bgColor="white" size="lg" required />
								<Input type="text" outline="none" name="last_name" placeholder="Last Name *" bgColor="white" size="lg" required />
							</SimpleGrid>

							<Input mt="4" type="text" outline="none" name="business_name" placeholder="Business Name (Optional)" bgColor="white" size="lg" />

							<SimpleGrid columns={[1, 1, 2]} gap="5" mt="4">
								<Input type="text" outline="none" name="email" placeholder="Email *" bgColor="white" size="lg" required />
								<Input type="text" outline="none" name="phone_number" placeholder="Phone Number *" bgColor="white" size="lg" required />
							</SimpleGrid>

							<SimpleGrid columns={[1, 1, 2]} gap="5" mt="4">
								<Input type="number" outline="none" name="num_of_units_desired" placeholder="Number of Units Desired *" bgColor="white" size="lg" required />
								<Input type="text" outline="none" name="price" placeholder="Price Up To $ *" bgColor="white" size="lg" startElement="$" required />
							</SimpleGrid>

							<SelectRoot multiple bgColor="white" mt="4" size="lg" collection={locations}>
								<SelectTrigger clearable>
									<SelectValueText placeholder="Location of Interest" />
								</SelectTrigger>
								<SelectContent>
									{locations.items.map(location => (
										<SelectItem item={location} key={location.value}>
											{location.label}
										</SelectItem>
									))}
								</SelectContent>
							</SelectRoot>

							<SelectRoot multiple bgColor="white" mt="4" size="lg" collection={municipalities}>
								<SelectTrigger clearable>
									<SelectValueText placeholder="Municipality of Interest" />
								</SelectTrigger>
								<SelectContent>
									{municipalities.items.map(municipality => (
										<SelectItem item={municipality} key={municipality.value}>
											{municipality.label}
										</SelectItem>
									))}
								</SelectContent>
							</SelectRoot>

							<SelectRoot bgColor="white" mt="4" size="lg" collection={finances}>
								<SelectTrigger clearable>
									<SelectValueText placeholder="Interested Financing Terms" />
								</SelectTrigger>
								<SelectContent>
									{finances.items.map(finance => (
										<SelectItem item={finance} key={finance.value}>
											{finance.label}
										</SelectItem>
									))}
								</SelectContent>
							</SelectRoot>

							<Text mt="6" fontSize="xs" color="blackAlpha.600">By submitting this form, you agree to receive emails, texts, and/or phone calls from POMIN.com. No purchase or sale is guaranteed. You may unsubscribe at any time. You agree to Agency Representation if interest in a property is stated. Our fee is 2.25% to Sellers and 2.25% to Buyers (4.5% of total sales price).</Text>
						
							<Button w="full" fontSize="xl" mt="6">Submit</Button>
						</form>
					</Container>
				</Container>
			</Box>
		</Box>
	);
}
