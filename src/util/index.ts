import { format as fnsFormat } from 'date-fns/esm';
import { zhCN } from 'date-fns/locale';

export const formatDate = (
  date: Date | string = new Date(),
  format: string = 'yyyy-MM-dd HH:mm:ss',
) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return fnsFormat(date, format, {
    locale: zhCN,
  });
};
