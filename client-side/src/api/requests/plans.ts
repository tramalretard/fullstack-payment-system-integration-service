import { api } from '../instance'
import type { PlansResponse } from '../types'

export const getAllPlans = async () =>
	await api.get<PlansResponse[]>('/plans').then(res => res.data)
