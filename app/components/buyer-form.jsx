'use client'

import { Button, createListCollection, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "./ui/select";
import { Roboto } from "next/font/google";
import { BuyerSubmitForm } from "../actions";
import { useState } from "react";
import { getCaptchaToken } from "../utils/captcha";
import Link from "next/link";
import { useRouter } from "next/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap", 
  weight: ["100", "300", "400", "500", "700", "900"]
})

const locations = createListCollection({
	items: [
		{ label: "Northwest Indiana", value: "Northwest Indiana" },
		{ label: "Lake County", value: "Lake County" },
		{ label: "Porter County", value: "Porter County"},
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

const priceRanges = createListCollection({
    items: [
        { label: "$100,000", value: "$100,000" },
        { label: "$200,000", value: "$200,000" },
        { label: "$300,000", value: "$300,000" },
        { label: "$400,000", value: "$400,000" },
        { label: "$500,000", value: "$500,000" },
        { label: "$600,000", value: "$600,000" },
        { label: "$700,000", value: "$700,000" },
        { label: "$800,000", value: "$800,000" },
        { label: "$900,000", value: "$900,000" },
        { label: "$1,000,000", value: "$1,000,000" },
        { label: "$1,100,000", value: "$1,100,000" },
        { label: "$1,200,000", value: "$1,200,000" },
        { label: "$1,300,000", value: "$1,300,000" },
        { label: "$1,400,000", value: "$1,400,000" },
        { label: "$1,500,000", value: "$1,500,000" },
        { label: "$1,600,000", value: "$1,600,000" },
        { label: "$1,700,000", value: "$1,700,000" },
        { label: "$1,800,000", value: "$1,800,000" },
        { label: "$1,900,000", value: "$1,900,000" },
        { label: "$2,000,000+", value: "$2,000,000+" }
    ]
});


export default function BuyerForm() {
    const [loading, setLoading] = useState(false);
    const [selectedMinPrice, setSelectedMinPrice] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.target)

        const token = await getCaptchaToken();

        const res = await BuyerSubmitForm(token, form);

        if (res.success) {
            router.push("/thank-you");
        }

        if (!res.success) {
            console.log(res.message);
        }

        setLoading(false);
    }

    const parsePrice = (price) => {
        return parseInt(price.replace(/[\$,]+/g, '').replace('+', ''), 10);
    }

    return (
        <>
            <form onSubmit={handleSubmit} id="get-started" className={roboto.className}>
                <SimpleGrid columns={[1, 1, 2]} gap="5">
                    <Input type="text" outline="none" name="first_name" placeholder="First Name *" bgColor="white" size="lg" required />
                    <Input type="text" outline="none" name="last_name" placeholder="Last Name *" bgColor="white" size="lg" required />
                </SimpleGrid>

                <Input mt="4" type="text" outline="none" name="business_name" placeholder="Business Name (Optional)" bgColor="white" size="lg" />

                <SimpleGrid columns={[1, 1, 2]} gap="5" mt="4">
                    <Input type="text" outline="none" name="email" placeholder="Email *" bgColor="white" size="lg" required />
                    <Input type="text" outline="none" name="phone_number" placeholder="Phone Number *" bgColor="white" size="lg" required />
                </SimpleGrid>

                <Input mt="4" type="number" outline="none" name="num_of_units_desired" placeholder="Number of Units Desired *" bgColor="white" size="lg" required />

                <SimpleGrid columns={[1, 1, 2]} gap="5" mt="4">
                    <SelectRoot onValueChange={(e) => setSelectedMinPrice(e.value[0])} required name="min_price" bgColor="white" size="lg" collection={priceRanges}>
                        <SelectTrigger>
                            <SelectValueText placeholder="Minimum Price *"  />
                        </SelectTrigger>
                        <SelectContent>
                            {priceRanges.items.map(price => (
                                <SelectItem item={price} key={price.value}>
                                    {price.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectRoot>
                    <SelectRoot required name="max_price" bgColor="white" size="lg" collection={priceRanges}>
                        <SelectTrigger>
                            <SelectValueText placeholder="Maximum Price *"  />
                        </SelectTrigger>
                        <SelectContent>
                            {priceRanges.items.filter(price => {
                                    // If no min price is selected, show all options.
                                    if (!selectedMinPrice) return true;
                                    // Otherwise, only include prices that are >= the selected min price.
                                    return parsePrice(price.value) >= parsePrice(selectedMinPrice);
                                }).map(price => (
                                <SelectItem item={price} key={price.value}>
                                    {price.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectRoot>
                    {/* <Input type="number" outline="none" name="min_price" placeholder="Minimum Price *" bgColor="white" size="lg" required />
                    <Input type="number" outline="none" name="max_price" placeholder="Maximum Price *" bgColor="white" size="lg" required /> */}
                </SimpleGrid>

                <SelectRoot required name="locations" multiple bgColor="white" mt="4" size="lg" collection={locations}>
                    <SelectTrigger clearable>
                        <SelectValueText placeholder="Locations of Interest (Check all that apply)" />
                    </SelectTrigger>
                    <SelectContent>
                        {locations.items.map(location => (
                            <SelectItem item={location} key={location.value}>
                                {location.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>

                <SelectRoot required name="financing_terms" multiple bgColor="white" mt="4" size="lg" collection={finances}>
                    <SelectTrigger clearable>
                        <SelectValueText placeholder="Interested Financing Terms * (Check all that apply)" />
                    </SelectTrigger>
                    <SelectContent>
                        {finances.items.map(finance => (
                            <SelectItem item={finance} key={finance.value}>
                                {finance.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>

                <Text mt="6" fontSize="xs" color="blackAlpha.600">Brought to you by Haven Realty Commercial LLC. By submitting this form, you agree to receive emails, texts, and/or phone calls from HavenPOMIN.com. You may unsubscribe at any time. No purchase or sale is guaranteed. You agree to Agency Representation if interest in a property is stated. Our commission is 4.5% of total sales price (2.25% to Sellers and 2.25% to Buyers).</Text>
            
                <Button type="submit" loading={loading} loadingText="Submitting..." w="full" fontSize="xl" mt="6">Submit</Button>

                <Text fontSize="xs" mt="2" color="blackAlpha.600">This site is protected by reCAPTCHA and the Google <Text as={Link} color="blue.400" href="https://policies.google.com/privacy" target="_blank">Privacy Policy</Text> and <Text as={Link} color="blue.400" href="https://policies.google.com/privacy" target="_blank">Terms of Service</Text> apply.</Text>
            </form>
        </>
    )
}