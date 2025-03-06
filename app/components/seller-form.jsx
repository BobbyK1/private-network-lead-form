'use client'

import { Button, createListCollection, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "./ui/select";
import { Roboto } from "next/font/google";
import { SellerSubmitForm } from "../actions";
import { useState } from "react";
import { getCaptchaToken } from "../utils/captcha";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NumericFormat, PatternFormat } from "react-number-format";

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


export default function SellerForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.target)

        const token = await getCaptchaToken();

        const res = await SellerSubmitForm(token, form);

        if (res.success) {
            router.push("/thank-you");
        }

        if (!res.success) {
            console.log(res.message);
        }

        setLoading(false);
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
                    <PatternFormat customInput={Input} format="(###) ###-####" type="text" outline="none" name="phone_number" placeholder="Phone Number *" bgColor="white" size="lg" required />
                </SimpleGrid>

                <Input mt="4" type="text" outline="none" name="property_address" placeholder="Property Address *" bgColor="white" size="lg" required />

                <Input mt="4" type="number" outline="none" name="num_of_units_on_property" placeholder="Number of Units On Property *" bgColor="white" size="lg" required />
                
                <NumericFormat customInput={Input} thousandSeparator="," prefix="$" allowNegative={false} decimalScale={0} mt="4" outline="none" name="list_price" placeholder="List Price *" bgColor="white" size="lg" required />

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