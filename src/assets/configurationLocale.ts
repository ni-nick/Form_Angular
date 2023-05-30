import * as moment from 'moment';
import { PrimeNGConfig } from 'primeng/api';

export function configurationLocale(primengConfig: PrimeNGConfig) {
  moment.locale('pt-br');
  primengConfig.setTranslation({
    firstDayOfWeek: 0,
    dayNames: moment.weekdays(),
    dayNamesMin:['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
    monthNames: moment.months(),
    monthNamesShort: moment.monthsShort(),
    today: 'Hoje',
    clear: 'Limpar'
  });
}
