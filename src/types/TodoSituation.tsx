export const SITUATION_MASTER = {
	untouch: {
		label: '未着手',
		color: 'default',
	},
	process: {
		label: '進行中',
		color: 'warning',
	},
	complete: {
		label: '完了',
		color: 'success',
	},
} as const;

export type Situation = keyof typeof SITUATION_MASTER;

export const SITUATION_OPTIONS = (
	Object.entries(SITUATION_MASTER) as [Situation, { label: string }][]
).map(([value, meta]) => ({
	value,
	label: meta.label,
}));
