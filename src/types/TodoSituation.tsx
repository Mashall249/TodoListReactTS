export const SITUATION_MASTER = {
	untouch: {
		label: '未着手',
		chipColor: 'default',
		borderColor: 'grey.300',
	},
	process: {
		label: '進行中',
		chipColor: 'warning',
		borderColor: 'warning.main',
	},
	complete: {
		label: '完了',
		chipColor: 'success',
		borderColor: 'success.main',
	},
} as const;

export type Situation = keyof typeof SITUATION_MASTER;

export const SITUATION_OPTIONS = (
	Object.entries(SITUATION_MASTER) as [Situation, { label: string }][]
).map(([value, meta]) => ({
	value,
	label: meta.label,
}));
