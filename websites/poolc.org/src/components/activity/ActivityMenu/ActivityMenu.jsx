import { SectionMenu } from '../../common/SectionMenu/SectionMenu';
import Spinner from '../../common/Spinner/Spinner';

const ActivityMenu = ({ loading, semesters, currentLocation }) => (
  <SectionMenu
    loading={loading}
    loadingFallback={<Spinner small />}
    items={(semesters ?? []).map((semester) => ({
      label: semester,
      to: `/activities?semester=${semester}`,
      active: currentLocation === semester,
    }))}
  />
);

export default ActivityMenu;
