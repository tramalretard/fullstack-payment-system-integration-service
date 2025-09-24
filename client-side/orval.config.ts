import * as dotenv from 'dotenv'
import { defineConfig } from 'orval'

dotenv.config()

export default defineConfig({
	client: {
		input: `${process.env.NEXT_PUBLIC_API_URL}/openapi.json`,
		output: {
			schemas: './src/api/types'
		}
	}
})
