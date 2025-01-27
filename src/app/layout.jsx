import "./globals.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
	title: "Societas Management System",
	description: "Generated by Next.js",
}

export default async function RootLayout({ children }) {
	const user = await currentUser()
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={`${GeistSans.className} antialiased min-h-screen flex flex-col`}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
							<TooltipProvider>
								<SidebarProvider>
									<AppSidebar username={user.fullName} email={user.emailAddresses[0].emailAddress} avatar={user.imageUrl}/>
									<SidebarInset>
										<Header/>
										{children}
									</SidebarInset>
								</SidebarProvider>
							</TooltipProvider>
							<Toaster/>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
