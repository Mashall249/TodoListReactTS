import { useEffect, useMemo, useState } from 'react';
import type { FilterBySituation, SortedByDates, TodoEntityType, TodoFormType } from '../types/Todo';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';

export const useTodo = () => {
	const [todos, setTodos] = useState<TodoEntityType[]>([]);
	const [editingTodo, setEditingTodo] = useState<TodoEntityType | null>(null);
	const [filter, setFilter] = useState<FilterBySituation>('all');
	const [sortKey, setSortKey] = useState<SortedByDates>('all');

	// Todo追加・更新
	const saveTodo = async (data: TodoFormType): Promise<'add' | 'update'> => {
		if (editingTodo) {
			// 更新
			await updateDoc(doc(db, 'todos', editingTodo.id), {
				...data,
				dueDate: Timestamp.fromDate(new Date(data.dueDate)),
				updatedAt: serverTimestamp(),
			});
			resetFormContents();
			return 'update';
		} else {
			// 追加
			await addDoc(collection(db, 'todos'), {
				...data,
				dueDate: Timestamp.fromDate(new Date(data.dueDate)),
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			});
			return 'add';
		}
	};

	// Todo削除
	const deleteTodo = async (id: string) => {
		await deleteDoc(doc(db, 'todos', id));
	};

	// フォームを開く
	const startEnteringForm = (todo: TodoEntityType) => {
		setEditingTodo(todo);
	};

	// フォームを空にする
	const resetFormContents = () => {
		setEditingTodo(null);
	};

	// フィルタリング・ソート
	const visibleTodos = useMemo(() => {
		const filtered = filter === 'all' ? todos : todos.filter((t) => t.situation === filter);

		if (sortKey === 'all') return filtered;

		const keyMap = {
			due: 'dueDate',
			created: 'createdAt',
			updated: 'updatedAt',
		} as const;

		const key = keyMap[sortKey];
		return [...filtered].sort((a, b) => a[key].toMillis() - b[key].toMillis());
	}, [todos, filter, sortKey]);
	// ソート

	// FireStore リアルタイム購読
	useEffect(() => {
		const q = collection(db, 'todos');

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const todos = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as TodoEntityType[];
			setTodos(todos);
		});

		return unsubscribe;
	}, []);

	return {
		todos: visibleTodos,
		editingTodo,
		filter,
		sortKey,
		setFilter,
		setSortKey,
		saveTodo,
		deleteTodo,
		startEdit: startEnteringForm,
		resetEdit: resetFormContents,
	};
};
