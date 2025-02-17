import { Button, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";


export default function LeadTypeChoice() {

    return (
        <>
            <SimpleGrid columns={[1, 1, 2]} gap="5">
                <Button as={Link} href={`http://buyer.${process.env.BASE_URL}`} size="lg">Buying</Button>
                <Button as={Link} href={`http://seller.${process.env.BASE_URL}`} size="lg">Selling</Button>
            </SimpleGrid>
        </>
    )
}