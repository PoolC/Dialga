import { createStyles } from 'antd-style';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import objectSupport from 'dayjs/plugin/objectSupport';
import { memo } from 'react';
import { BaekjoonResponse } from '~/lib/api-v2';
import ActivityCalendar, {
  Activity,
  Labels,
  Level,
} from 'react-activity-calendar';
import { Tooltip } from 'antd';

dayjs.extend(objectSupport);
dayjs.extend(weekOfYear);

const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    overflow-x: auto;
    overflow-y: clip;
    padding-top: 10px;
  `,
  calendarWrap: css`
    width: 100%;
    min-width: 800px;
    display: flex;
    justify-content: center;
  `,
}));

function MyPageGrassSection({
  baekjoonData,
}: {
  baekjoonData: BaekjoonResponse[];
}) {
  const { styles } = useStyles();

  const getDisplayingMonths = () => {
    const currYear = dayjs().year();
    const currMonth = dayjs().month();

    const res = [];

    for (let m = currMonth + 1; m < 12 + 1; m++) {
      res.push(dayjs({ year: currYear - 1, month: m }));
    }

    for (let m = 1; m < currMonth + 1; m++) {
      res.push(dayjs({ year: currYear, month: m }));
    }

    return res;
  };

  const getDisplayingDays = (): Activity[] => {
    const months = getDisplayingMonths();

    const res: Activity[] = [];

    for (const month of months) {
      for (let i = 1; i < month.daysInMonth() + 1; i++) {
        const date = month.date(i);
        if (date.isAfter(dayjs())) {
          break;
        }

        const formattedDate = date.format('YYYY-MM-DD');

        const filtered = baekjoonData.filter(
          (data) => data.date === formattedDate,
        );

        res.push({
          date: formattedDate,
          count: filtered.length,
          level: filtered.length as Level,
        });
      }
    }

    return res;
  };

  const labels: Labels = {
    months: Array(12)
      .fill(0)
      .map((_, i) => `${i + 1}월`),
    weekdays: ['일', '월', '화', '수', '목', '금', '토'],
    legend: {
      less: 'Less',
      more: 'More',
    },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.calendarWrap}>
        <ActivityCalendar
          data={getDisplayingDays()}
          renderBlock={(block, activity) => (
            <Tooltip title={`${activity.count}개 풀이 | ${activity.date}`}>
              {block}
            </Tooltip>
          )}
          theme={{
            light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
          }}
          labels={labels}
          showWeekdayLabels
          hideTotalCount
        />
      </div>
    </div>
  );
}

export default memo(MyPageGrassSection);
