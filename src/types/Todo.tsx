import type { Timestamp } from 'firebase/firestore';

export type Situation = 'untouch' | 'process' | 'complete';

export type FilterBySituation = 'all' | 'untouch' | 'process' | 'complete';

export type SortedByDates = 'all' | 'due' | 'created' | 'updated';

export type TodoEntityType = {
	id: string;
	title: string;
	details: string;
	situation: Situation;
	dueDate: Timestamp;
	createdAt: Timestamp;
	updatedAt: Timestamp;
};

export type TodoFormType = {
	title: string;
	details: string;
	situation: TodoEntityType['situation'];
	dueDate: string;
};

export const SITUATION_LABELS: Record<Situation, string> = {
	untouch: '未着手',
	process: '進行中',
	complete: '完了',
} as const;
