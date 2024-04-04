'use client'
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar/navbar";

import { CookiesProvider } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<CookiesProvider>
				{/* <body className={inter.className}> */}
				<body className={"flex flex-col h-100vh"}>
					<Navbar />
					{children}
				</body>
			</CookiesProvider>
		</html>
	);
}
