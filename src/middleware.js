import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

// const isProtectedRoute = createRouteMatcher(["/(.*)"])
const isPublicRoute = createRouteMatcher(["/auth/login(.*)", "/auth/register(.*)", "/api/webhooks/clerk"])

export default clerkMiddleware(async function(auth, req) {
	if (!isPublicRoute(req)) {
        await auth.protect()
    }
	const { userId, orgId } = await auth()
	// Redirect signed in users to organization selection page if they are not active in an organization
	if (userId && !orgId && req.nextUrl.pathname !== "/auth/organization") {
		const searchParams = new URLSearchParams({ redirectUrl: req.url })
		const orgSelection = new URL(`/auth/organization?${searchParams.toString()}`, req.url)
		return NextResponse.redirect(orgSelection)
	}
})

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
}