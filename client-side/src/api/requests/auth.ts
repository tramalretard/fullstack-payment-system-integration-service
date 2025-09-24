import { api } from '../instance'
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types'

export const register = async (data: RegisterRequest) =>
	await api.post<AuthResponse>('/auth/register', data).then(res => res.data)

export const login = async (data: LoginRequest) =>
	await api.post<AuthResponse>('/auth/login', data).then(res => res.data)
