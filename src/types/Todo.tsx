import type { Timestamp } from 'firebase/firestore';
import type { Situation } from './TodoSituation';

export type FilterBySituation = 'all' | Situation;

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
	situation: Situation;
	dueDate: string;
};
