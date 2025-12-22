import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

export const formatDate = (dateStr?: string | null, format = 'YYYY年MM月DD日(ddd)') => {
	if (!dateStr) return '-';

	const d = dayjs(dateStr);
	return d.isValid() ? d.format(format) : '-';
};
