import cookies from 'js-cookie'

export enum EnumTokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export const getAccessToken = () => {
	const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)

	return accessToken ?? null
}

export const saveTokenInCookie = (accessToken: string) => {
	cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: process.env.NEXT_PUBLIC_COOKIES_DOMAIN,
		sameSite: 'strict',
		expires: 1
	})
}

export const removeTokenFromCookie = () =>
	cookies.remove(EnumTokens.ACCESS_TOKEN)
