import type { FC } from 'react';
import type { FilterBySituation, SortedByDates } from '../../types/Todo';
import { Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { SITUATION_OPTIONS } from '../../types/TodoSituation';

export type TodoFilterProps = {
	filter: FilterBySituation;
	sortKey: SortedByDates;
	setFilter: (v: FilterBySituation) => void;
	setSortKey: (v: SortedByDates) => void;
};

export const TodoFilterControl: FC<TodoFilterProps> = ({
	filter,
	sortKey,
	setFilter,
	setSortKey,
}) => {
	return (
		<Box sx={{ p: 2, mb: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
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
							onChange={(e) => setFilter(e.target.value as FilterBySituation)}
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
							onChange={(e) => setSortKey(e.target.value as SortedByDates)}
						>
							<MenuItem value="due">期限が近い順</MenuItem>
							<MenuItem value="created">作成日が古い順</MenuItem>
							<MenuItem value="updated">更新日が新しい順</MenuItem>
						</Select>
					</FormControl>
				</Stack>
			</Stack>
		</Box>
	);
};
