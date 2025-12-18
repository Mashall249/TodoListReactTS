import type { FC } from 'react';
import type { FilterBySituation, SortedByDates } from '../types/Todo';
import { FormControl, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { SITUATION_OPTIONS } from '../types/TodoSituation';

type FilterProps = {
	filter: FilterBySituation;
	sortKey: SortedByDates;
	onChangeByFilter: (v: FilterBySituation) => void;
	onChangeBySort: (v: SortedByDates) => void;
};

export const TodoFilterControl: FC<FilterProps> = ({
	filter,
	sortKey,
	onChangeByFilter,
	onChangeBySort,
}) => {
	return (
		<Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={2}
				alignItems="center"
				justifyContent="space-between"
			>
				{/* フィルタ */}
				<Stack direction="row" spacing={1} alignItems="center">
					<FilterAltIcon fontSize="small" color="action" />

					<Typography variant="body2">状況</Typography>

					<FormControl size="small" sx={{ minWidth: 140 }}>
						<Select
							value={filter}
							onChange={(e) => onChangeByFilter(e.target.value as FilterBySituation)}
						>
							<MenuItem value="all">すべて</MenuItem>
							{SITUATION_OPTIONS.map((s) => (
								<MenuItem key={s.value} value={s.value}>
									{s.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>

				{/* ソート */}
				<Stack direction="row" spacing={1} alignItems="center">
					<SortIcon fontSize="small" color="action" />

					<Typography variant="body2">並び替え</Typography>

					<FormControl size="small" sx={{ minWidth: 180 }}>
						<Select
							value={sortKey}
							onChange={(e) => onChangeBySort(e.target.value as SortedByDates)}
						>
							<MenuItem value="due">期限が近い順</MenuItem>
							<MenuItem value="created">作成日が古い順</MenuItem>
							<MenuItem value="updated">更新日が新しい順</MenuItem>
						</Select>
					</FormControl>
				</Stack>
			</Stack>
		</Paper>
	);
};
