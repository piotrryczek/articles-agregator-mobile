import * as dateFns from 'date-fns';
import pl from 'date-fns/locale/pl';

export default (date: string) =>
  dateFns.format(new Date(date), 'M MMMM, yyyy', {
    locale: pl,
  });
