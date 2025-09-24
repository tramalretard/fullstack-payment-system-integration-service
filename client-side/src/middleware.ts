import { type NextRequest, NextResponse } from 'next/server'

import { EnumTokens } from './lib/cookies'

const protectedRoutes = ['/dashboard']

const authRoutes = ['/auth/login', '/auth/register']

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthenticated = !!accessToken && !!refreshToken

	if (!isAuthenticated && protectedRoutes.includes(pathname)) {
		const loginUrl = request.nextUrl.clone()

		loginUrl.pathname = '/auth/login'

		return NextResponse.redirect(loginUrl)
	}

	if (isAuthenticated && authRoutes.includes(pathname)) {
		const dashboardUrl = request.nextUrl.clone()

		dashboardUrl.pathname = '/dashboard'

		return NextResponse.redirect(dashboardUrl)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard', '/auth/:path*']
}
