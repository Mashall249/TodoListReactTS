import { useCallback, useEffect, useState } from 'react';
import type { FilterBySituation, SortedByDates, TodoEntityType, TodoFormType } from '../types/Todo';
import { todoApi } from '../api/todo';

export const useTodo = () => {
	const [todos, setTodos] = useState<TodoEntityType[]>([]);
	const [editingTodo, setEditingTodo] = useState<TodoEntityType | null>(null);
	const [filter, setFilter] = useState<FilterBySituation>('all');
	const [sortKey, setSortKey] = useState<SortedByDates>('updated');

	// 一覧取得
	const fetchTodos = useCallback(async () => {
		try {
			const res = await todoApi.getTodos({
				status: filter === 'all' ? undefined : filter,
				sort: sortKey,
			});
			setTodos(res.data);
		} catch (error) {
			console.error('Failed to fetch todos', error);
		}
	}, [filter, sortKey]);

	// fetchTodosをそのまま呼び出すと無限ループに近い挙動を検知してしまう
	useEffect(() => {
		// 非同期関数として実行を明示
		const load = async () => {
			await fetchTodos();
		};
		load();
	}, [fetchTodos]);

	// Todo追加・更新
	const saveTodo = async (data: TodoFormType): Promise<'add' | 'update'> => {
		let mode: 'add' | 'update';

		if (editingTodo) {
			await todoApi.updateTodo(editingTodo.id, data);
			mode = 'update';
		} else {
			await todoApi.createTodo(data);
			mode = 'add';
		}

		setEditingTodo(null);
		await fetchTodos();

		return mode;
	};

	// Todo削除
	const deleteTodo = async (id: number) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

		try {
			await todoApi.deleteTodo(id);
		} catch (error) {
			console.error('削除に失敗しました', error);
			await fetchTodos();
		}
	};

	return {
		todos,
		editingTodo,
		filter,
		sortKey,
		setFilter,
		setSortKey,
		saveTodo,
		deleteTodo,
		startEdit: setEditingTodo,
		resetEdit: () => setEditingTodo(null),
	};
};
