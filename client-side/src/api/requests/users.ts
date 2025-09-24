import { instance } from '../instance'
import type { GetMeResponse } from '../types'

export const getMe = async () =>
	await instance.get<GetMeResponse>('/users/me').then(res => res.data)
