import { saveTokenInCookie } from '@/lib/cookies'

import { api } from '../instance'
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types'

export const register = async (data: RegisterRequest) =>
	await api.post<AuthResponse>('/auth/register', data).then(res => {
		if (res.data.accessToken) saveTokenInCookie(res.data.accessToken)

		return res.data
	})

export const login = async (data: LoginRequest) =>
	await api.post<AuthResponse>('/auth/login', data).then(res => {
		if (res.data.accessToken) saveTokenInCookie(res.data.accessToken)

		return res.data
	})

export const refresh = async () =>
	await api.post<AuthResponse>('/auth/refresh').then(res => {
		if (res.data.accessToken) saveTokenInCookie(res.data.accessToken)

		return res.data
	})
