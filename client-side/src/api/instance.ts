import axios, { type CreateAxiosDefaults } from 'axios'

import { getAccessToken, removeTokenFromCookie } from '@/lib/cookies'
import { errorCatch } from '@/lib/utils'

import { refresh } from './requests'

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
}

export const api = axios.create(options)
export const instance = axios.create(options)

instance.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			error.response.status == 401 ||
			errorCatch(error) === 'jwt expired' ||
			(errorCatch(error) === 'jwt must be provided' &&
				error.config &&
				!error.config._isRetry)
		) {
			originalRequest._isRetry = true

			try {
				await refresh()

				return instance.request(originalRequest)
			} catch (error) {
				if (
					errorCatch(error) === 'jwt expired' ||
					errorCatch(error) === 'Не удалось получить refresh токен'
				)
					removeTokenFromCookie()
			}
		}

		throw error
	}
)
