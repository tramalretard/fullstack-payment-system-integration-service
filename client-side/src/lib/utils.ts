import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function errorCatch(error: any) {
	const message = error.response.data.message

	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message
}
