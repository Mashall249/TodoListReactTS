import type { TodoEntityType, TodoFormType } from '../types/Todo';
import api from './client';

export const todoApi = {
	getTodos: (params?: { status?: string; sort?: string }) =>
		api.get<TodoEntityType[]>('/todos', { params }),

	createTodo: (data: TodoFormType) => api.post<TodoEntityType>('/todos', data),

	updateTodo: (id: number, data: TodoFormType) => api.put<TodoEntityType>(`/todos/${id}`, data),

	deleteTodo: (id: number) => api.delete(`/todos/${id}`),
};
