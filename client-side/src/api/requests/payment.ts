import { api, instance } from '../instance'
import type {
	InitPaymentRequest,
	InitPaymentResponse,
	PaymentDetailsResponse,
	PaymentHistoryResponse
} from '../types'

export const getPaymentHistory = async (id: string) =>
	await instance
		.get<PaymentHistoryResponse[]>('/payments')
		.then(res => res.data)

export const getPaymentById = async (id: string) =>
	await api
		.get<PaymentDetailsResponse>(`/payments/${id}`)
		.then(res => res.data)

export const initPayment = async (data: InitPaymentRequest) =>
	await instance
		.post<InitPaymentResponse>('/payments/init', data)
		.then(res => res.data)
