import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export const formatDate = (date?: Timestamp | null) => {
	if (!date || !(date instanceof Timestamp)) {
		return '-';
	}
	return dayjs(date?.toDate()).format('YYYY年MM月DD日(ddd)');
};
