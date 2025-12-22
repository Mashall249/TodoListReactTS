import axios from 'axios';
import type { ApiErrorResponse } from '../types/UI';

export const getApiErrorMessage = (error: unknown): string => {
	if (axios.isAxiosError<ApiErrorResponse>(error) && error.response) {
		const data = error.response.data;

		if (data.message) return data.message;
		if (data.error) return data.error;
	}
	return '予期しないエラーが発生しました。もう一度お試しください。';
};
