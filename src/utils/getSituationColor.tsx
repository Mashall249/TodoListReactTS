import type { TodoEntityType } from '../types/Todo';

export const getSituationColor = (situation: TodoEntityType['situation']) => {
	switch (situation) {
		case 'complete':
			return 'success';
		case 'process':
			return 'warning';
		default:
			return 'default';
	}
};
