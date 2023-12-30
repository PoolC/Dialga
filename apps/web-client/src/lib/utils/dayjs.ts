// dayjs @see https://github.com/react-component/picker/issues/123
import dayjsImpl from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import isBetween from 'dayjs/plugin/isBetween';

dayjsImpl.extend(customParseFormat);
dayjsImpl.extend(advancedFormat);
dayjsImpl.extend(weekday);
dayjsImpl.extend(localeData);
dayjsImpl.extend(weekOfYear);
dayjsImpl.extend(weekYear);
dayjsImpl.extend(objectSupport);
dayjsImpl.extend(isBetween);

export const dayjs = dayjsImpl;
