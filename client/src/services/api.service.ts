const BASE_URL = import.meta.env.VITE_API_URL;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function request<T>(endpoint: string, method: HttpMethod = 'GET', body?: unknown): Promise<T> {
	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (body) {
		options.body = JSON.stringify(body);
	}

	const response = await fetch(`${BASE_URL}${endpoint}`, options);

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: response.statusText }));
		throw new Error(error.message ?? 'An unexpected error occurred');
	}

	// 204 No Content (e.g. DELETE) has no body
	if (response.status === 204) {
		return null as T;
	}

	return response.json() as Promise<T>;
}

export const apiService = {
	get: <T>(endpoint: string) => request<T>(endpoint),
	post: <T>(endpoint: string, body: unknown) => request<T>(endpoint, 'POST', body),
	put: <T>(endpoint: string, body: unknown) => request<T>(endpoint, 'PUT', body),
	delete: <T>(endpoint: string) => request<T>(endpoint, 'DELETE'),
};