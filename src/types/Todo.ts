import type { Situation } from './TodoSituation';

export type FilterBySituation = 'all' | Situation;

export type SortedByDates = 'all' | 'due' | 'created' | 'updated';

export type TodoEntityType = {
	id: number;
	title: string;
	details: string;
	situation: Situation;
	dueDate: string;
	createdAt: string;
	updatedAt: string;
};

export type TodoFormType = {
	title: string;
	details: string;
	situation: Situation;
	dueDate: string;
};
