import './globals.css';
import { Provider } from "./components/ui/provider";
import Header from "./components/header";
import Footer from "./components/footer";
import Script from 'next/script';

export const metadata = {
  title: "POMIN",
  description: "Everything we do is personal connections, not automated lists. We're real local people who actually know about the area. Join our private network to grow your real estate portfolio.",
};

export default function RootLayout({ children }) {
  return (
	<html lang="en">
		<body>
			<Script strategy="beforeInteractive" src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}></Script>
			<Provider>
				<Header />
					{children}
				<Footer />
			</Provider>
		</body>
	</html>
  );
}
