import { RegisterFormValues } from '@/components/auth/register-form'

import { api } from '../instance'

export const register = async (data: RegisterFormValues) =>
	await api.post('/auth/register', data).then(res => res.data)
