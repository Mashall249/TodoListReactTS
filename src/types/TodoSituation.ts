type MuiChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export const SITUATION_MASTER = {
	untouch: {
		label: '未着手',
		chipColor: 'default' as MuiChipColor,
		borderColor: 'grey.300',
	},
	process: {
		label: '進行中',
		chipColor: 'warning' as MuiChipColor,
		borderColor: 'warning.main',
	},
	complete: {
		label: '完了',
		chipColor: 'success' as MuiChipColor,
		borderColor: 'success.main',
	},
} as const;

export type Situation = keyof typeof SITUATION_MASTER;

export const SITUATION_OPTIONS = (
	Object.entries(SITUATION_MASTER) as [Situation, (typeof SITUATION_MASTER)[Situation]][]
).map(([value, meta]) => ({
	value,
	label: meta.label,
}));
