import { useMemo, useState } from 'react';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import Spinner from '../../common/Spinner/Spinner';
import { SectionTabs } from '../../common/SectionTabs/SectionTabs';
import { getHourMinuteString } from '../../../lib/utils/getDateString';
import { StyledDeleteButton } from '../../activity/ActivityCard/ActivityCard.styles';
import {
  ApplicantName,
  DateGroupHeader,
  DateGroupTitle,
  DateTables,
  EmptyState,
  InterviewTable,
  InterviewTableWrapper,
  PageHeader,
  StatusBadge,
  Title,
} from './AdminInterview.styles';

const getSlotStatus = (applicantCount, capacity) => {
  if (applicantCount === 0) return { label: '비어 있음', tone: 'empty' };
  if (applicantCount >= Number(capacity)) return { label: '마감', tone: 'closed' };
  return { label: '모집 중', tone: 'open' };
};

const Applicant = ({ interviewee, handleCancelInterview }) => {
  const cancel = () => {
    if (window.confirm(`${interviewee.name}님의 면접 신청을 취소하시겠습니까?`)) {
      handleCancelInterview({ loginId: interviewee.loginID });
    }
  };

  return (
    <>
      <td><ApplicantName>{interviewee.name}</ApplicantName></td>
      <td>{interviewee.studentID}</td>
      <td>{interviewee.department}</td>
      <td>{interviewee.phoneNumber}</td>
      <td><StyledDeleteButton onClick={cancel}>신청 취소</StyledDeleteButton></td>
    </>
  );
};

const SlotRow = ({ slot, handleCancelInterview }) => {
  const applicants = slot.interviewees || [];
  const status = getSlotStatus(applicants.length, slot.capacity);

  if (applicants.length === 0) {
    return (
      <tr className="slot-group-start">
        <td>{getHourMinuteString(slot.startTime)} - {getHourMinuteString(slot.endTime)}</td>
        <td><strong>0</strong> / {slot.capacity}명</td>
        <td><StatusBadge data-tone={status.tone}>{status.label}</StatusBadge></td>
        <td colSpan="5">신청자 없음</td>
      </tr>
    );
  }

  return applicants.map((applicant, index) => (
    <tr key={applicant.loginID} className={index === 0 ? 'slot-group-start' : undefined}>
      {index === 0 && <>
        <td rowSpan={applicants.length}>{getHourMinuteString(slot.startTime)} - {getHourMinuteString(slot.endTime)}</td>
        <td rowSpan={applicants.length}><strong>{applicants.length}</strong> / {slot.capacity}명</td>
        <td rowSpan={applicants.length}><StatusBadge data-tone={status.tone}>{status.label}</StatusBadge></td>
      </>}
      <Applicant interviewee={applicant} handleCancelInterview={handleCancelInterview} />
    </tr>
  ));
};

const DateSlots = ({ group, handleCancelInterview }) => {
  return (
    <section>
      <DateGroupHeader>
        <DateGroupTitle>{group.date}</DateGroupTitle>
      </DateGroupHeader>
      <InterviewTableWrapper className="date-slot-table">
        <InterviewTable>
          <thead><tr><th>시간</th><th>신청 / 정원</th><th>상태</th><th>이름</th><th>학번</th><th>학과</th><th>연락처</th><th>조치</th></tr></thead>
          <tbody>
            {group.slots.map((slot) => (
              <SlotRow
                key={slot.slotId}
                slot={slot}
                handleCancelInterview={handleCancelInterview}
              />
            ))}
          </tbody>
        </InterviewTable>
      </InterviewTableWrapper>
    </section>
  );
};

const AdminInterview = ({ loading, data, handleCancelInterview }) => {
  const [selectedDate, setSelectedDate] = useState('all');
  const groups = data?.data || [];
  const slots = useMemo(
    () => groups
      .filter((group) => selectedDate === 'all' || group.date === selectedDate)
      .flatMap((group) => group.slots.map((slot) => ({ ...slot, date: group.date }))),
    [groups, selectedDate],
  );
  const visibleGroups = groups.filter((group) => selectedDate === 'all' || group.date === selectedDate);

  return (
    <WhiteNarrowBlock>
      <PageHeader>
        <div>
          <Title>면접 신청 조회</Title>
        </div>
      </PageHeader>
      {loading && <Spinner />}
      {!loading && (
        <>
          <SectionTabs
            items={[{ key: 'all', label: '전체' }, ...groups.map((group) => ({ key: group.date, label: group.date }))]}
            activeKey={selectedDate}
            onChange={setSelectedDate}
          />
          <DateTables>
            {visibleGroups.map((group) => <DateSlots key={group.date} group={group} handleCancelInterview={handleCancelInterview} />)}
            {slots.length === 0 && <EmptyState>등록된 면접 슬롯이 없습니다.</EmptyState>}
          </DateTables>
        </>
      )}
    </WhiteNarrowBlock>
  );
};

export default AdminInterview;
