'use server'

import { z } from "zod"
import { verifyCaptchaToken } from "./utils/captcha";

const validPrices = [
  "$100,000",
  "$200,000",
  "$300,000",
  "$400,000",
  "$500,000",
  "$600,000",
  "$700,000",
  "$800,000",
  "$900,000",
  "$1,000,000",
  "$1,100,000",
  "$1,200,000",
  "$1,300,000",
  "$1,400,000",
  "$1,500,000",
  "$1,600,000",
  "$1,700,000",
  "$1,800,000",
  "$1,900,000",
  "$2,000,000+"
];

const buyerSchema = z.object({
    first_name: z
      .string()
      .min(1, "First Name is required")
      .max(100, "First Name cannot exceed 100 characters"),
  
    last_name: z
      .string()
      .min(1, "Last Name is required")
      .max(100, "Last Name cannot exceed 100 characters"),
  
    business_name: z
      .string()
      .max(150, "Business Name cannot exceed 150 characters")
      .optional(),
  
    email: z
      .string()
      .email("Invalid email address")
      .max(200, "Email cannot exceed 200 characters"),
  
    phone_number: z
      .string()
      .min(1, "Phone Number is required")
      .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone Number must be between 10 to 15 digits"),
  
    num_of_units_desired: z
      .string({ invalid_type_error: "Number of Units Desired must be a number" }),
  
    min_price: z
      .array(z.enum(validPrices))
      .min(1, "Minimum Price is required"),
  
    max_price: z
      .array(z.enum(validPrices))
      .min(1, "Maximum Price is required"),
  
    locations: z
      .array(
        z.enum([
          "Northwest Indiana", "Lake County", "Porter County", "Beverly Shores", "Cedar Lake", "Chesterton", "Crown Point", "Dyer", "Gary", "East Chicago", "Griffith", "Hammond", "Hebron", "Highland", "Hobart", "Kouts", "Lake Station", "Lowell", "Merrillville", "Miller’s Beach", "Munster", "Portage", "Schererville", "Schneider", "Shelby", "St John", "Valparaiso", "Wheeler", "Whiting"
        ])
      )
      .min(1, "At least one location must be selected"),
  
    financing_terms: z
      .array(z.enum(["Cash", "Loan", "Seller Financing"]))
      .min(1, "At least one financing term must be selected"),

    min_price: z
    .array(z.enum(validPrices))
    .min(1, "Minimum Price is required"),
  
    max_price: z
    .array(z.enum(validPrices))
    .min(1, "Maximum Price is required"),
});

const sellerSchema = z.object({
  first_name: z
      .string()
      .min(1, "First Name is required")
      .max(100, "First Name cannot exceed 100 characters"),
  
  last_name: z
    .string()
    .min(1, "Last Name is required")
    .max(100, "Last Name cannot exceed 100 characters"),

  business_name: z
    .string()
    .max(150, "Business Name cannot exceed 150 characters")
    .optional(),

  email: z
    .string()
    .email("Invalid email address")
    .max(200, "Email cannot exceed 200 characters"),

  phone_number: z
    .string()
    .min(1, "Phone Number is required")
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone Number must be between 10 to 15 digits"),

  property_address: z
    .string()
    .max(150, "Property Address cannot exceed 150 characters"),

  num_of_units_on_property: z
    .string({ invalid_type_error: "Number of Units Desired must be a number" }),

  list_price: z
    .string()
    .refine(value => {
      const cleanedValue = value.replace(/[^0-9.-]+/g, '')

      return !isNaN(parseFloat(cleanedValue)) && isFinite(parseFloat(cleanedValue))
    }, {
      message: "Invalid currency format"
    }),
  
  financing_terms: z
    .array(z.enum(["Cash", "Loan", "Seller Financing"]))
    .min(1, "At least one financing term must be selected"),
})

export async function BuyerSubmitForm(token, formData) {
	if (!token) {
		return JSON.parse(JSON.stringify({ success: false, message: "Token not found."}))
	}

	// Verify reCAPTCHA Token
	const captchaData = await verifyCaptchaToken(token);

  console.log(captchaData)

	if (!captchaData) {
    console.log({ success: false, message: "reCAPTCHA Failed"})
		return JSON.parse(JSON.stringify({ success: false, message: "reCAPTCHA Failed"}))
	}


	if (!captchaData.success || captchaData.score < 0.5) {
    console.log({ success: false, message: "reCAPTCHA Failed", errors: !captchaData.success ? captchaData['error-codes'] : undefined})
		return JSON.parse(JSON.stringify({ success: false, message: "reCAPTCHA Failed", errors: !captchaData.success ? captchaData['error-codes'] : undefined}))
	}

	const result = buyerSchema.parse({
		first_name: formData.get("first_name"),
		last_name: formData.get("last_name"),
		business_name: formData.get("business_name"),
		email: formData.get("email"),
		phone_number: formData.get("phone_number"),
		num_of_units_desired: formData.get("num_of_units_desired"),
		min_price: formData.getAll("min_price"),
		max_price: formData.getAll("max_price"),
		locations: formData.getAll("locations"),
		financing_terms: formData.getAll("financing_terms"),
	});

  try {
    const res = await fetch(process.env.BUYER_TO_CINC_AND_CC_ZAPIER_WEBHOOK, { method: "POST", body: JSON.stringify(result)});

    if (!res.ok) {
      console.log({ success: false, message: "Unable to communicate with Zapier." })
      return JSON.parse(JSON.stringify({ success: false, message: "Unable to communicate with Zapier." }))
    }
  
    const ZapData = await res.json();
    console.log(ZapData)
  } catch (err) {
    console.log({ success: false, message: err})
    return JSON.parse(JSON.stringify({ success: false, message: err}))
  }

  console.log({ success: true })
	return JSON.parse(JSON.stringify({ success: true }));
}

export async function SellerSubmitForm(token, formData) {
  if (!token) {
    return JSON.parse(JSON.stringify({ success: false, message: "Token not found." }))
  }

  // Verify reCAPTCHA Token
  const captchaData = await verifyCaptchaToken(token);

  if (!captchaData) {
    return JSON.parse(JSON.stringify({ success: false, message: "reCAPTCHA Failed" }))
  }

  if (!captchaData.success || captchaData.score < 0.5) {
    return JSON.parse(JSON.stringify({ success: false, message: "reCAPTCHA Failed", errors: !captchaData.success ? captchaData['error-codes'] : undefined }))
  }

  const result = sellerSchema.parse({
    first_name: formData.get("first_name"),
		last_name: formData.get("last_name"),
		business_name: formData.get("business_name"),
		email: formData.get("email"),
		phone_number: formData.get("phone_number"),
    property_address: formData.get("property_address"),
    num_of_units_on_property: formData.get("num_of_units_on_property"),
    list_price: formData.get("list_price"),
		financing_terms: formData.getAll("financing_terms"),
  })

  try {
    const res = await fetch(process.env.SELLER_TO_CINC_AND_CC_ZAPIER_WEBHOOK, { method: "POST", body: JSON.stringify(result)});

    if (!res.ok) {
      return JSON.parse(JSON.stringify({ success: false, message: "Unable to communicate with Zapier." }))
    }
  
    const ZapData = await res.json();
  } catch (err) {
    return JSON.parse(JSON.stringify({ success: false, message: err}))
  }

  return JSON.parse(JSON.stringify({ success: true }))
}