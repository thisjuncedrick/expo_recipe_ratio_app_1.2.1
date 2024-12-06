import axios from 'axios';

const TIMEOUT = 10000; // Constant timeout
const TIMEOUT_ERR = `Request timed out after ${TIMEOUT / 1000} seconds.`;
const BASE_URL = 'https://recipe-ratio-api-v2-jun-cedrick-narcisos-projects.vercel.app';

/**
 * Performs a GET request to the given baseURL and endpoint.
 * @param BASE_URL - The API base URL.
 * @param endpoint - The endpoint to be requested.
 * @returns The response data.
 */

export const requestAPI = async (endpoint: string) => {
	const source = axios.CancelToken.source();
	const timeout = setTimeout(() => {
		source.cancel(TIMEOUT_ERR);
	}, TIMEOUT);

	try {
		const response = await axios.get(endpoint, {
			baseURL: BASE_URL,
			timeout: TIMEOUT,
			cancelToken: source.token,
		});
		clearTimeout(timeout);
		return response.data;
	} catch (error) {
		clearTimeout(timeout);
		if (axios.isCancel(error)) {
			throw new Error(TIMEOUT_ERR);
		}
		throw error;
	}
};
