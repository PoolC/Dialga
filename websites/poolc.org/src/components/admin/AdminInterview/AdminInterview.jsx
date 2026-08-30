import { useMemo, useState } from 'react';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import Spinner from '../../common/Spinner/Spinner';
import { getHourMinuteString } from '../../../lib/utils/getDateString';
import { StyledDeleteButton } from '../../activity/ActivityCard/ActivityCard.styles';
import {
  ApplicantList,
  ApplicantMeta,
  ApplicantName,
  ApplicantPanel,
  DateFilterBar,
  DateFilterButton,
  EmptyState,
  ExpandButton,
  HeaderSummary,
  InterviewTable,
  InterviewTableWrapper,
  PageHeader,
  StatusBadge,
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
    <ApplicantList>
      <div>
        <ApplicantName>{interviewee.name}</ApplicantName>
        <ApplicantMeta>{interviewee.studentID} · {interviewee.department} · {interviewee.phoneNumber}</ApplicantMeta>
      </div>
      <StyledDeleteButton onClick={cancel}>신청 취소</StyledDeleteButton>
    </ApplicantList>
  );
};

const SlotRow = ({ slot, date, expanded, onToggle, handleCancelInterview }) => {
  const applicants = slot.interviewees || [];
  const status = getSlotStatus(applicants.length, slot.capacity);

  return (
    <>
      <tr>
        <td>{date}</td>
        <td>{getHourMinuteString(slot.startTime)} - {getHourMinuteString(slot.endTime)}</td>
        <td><strong>{applicants.length}</strong> / {slot.capacity}명</td>
        <td><StatusBadge data-tone={status.tone}>{status.label}</StatusBadge></td>
        <td>
          <ExpandButton type="button" onClick={onToggle} aria-expanded={expanded}>
            신청자 {applicants.length}명
          </ExpandButton>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan="5">
            <ApplicantPanel>
              {applicants.length === 0
                ? <EmptyState>신청자가 없습니다.</EmptyState>
                : applicants.map((applicant) => <Applicant key={applicant.loginID} interviewee={applicant} handleCancelInterview={handleCancelInterview} />)}
            </ApplicantPanel>
          </td>
        </tr>
      )}
    </>
  );
};

const AdminInterview = ({ loading, data, handleCancelInterview }) => {
  const [selectedDate, setSelectedDate] = useState('all');
  const [expandedSlotId, setExpandedSlotId] = useState(null);
  const groups = data?.data || [];
  const slots = useMemo(
    () => groups
      .filter((group) => selectedDate === 'all' || group.date === selectedDate)
      .flatMap((group) => group.slots.map((slot) => ({ ...slot, date: group.date }))),
    [groups, selectedDate],
  );
  const applicantCount = slots.reduce((total, slot) => total + (slot.interviewees || []).length, 0);
  const closedCount = slots.filter((slot) => (slot.interviewees || []).length >= Number(slot.capacity)).length;

  return (
    <WhiteNarrowBlock>
      <PageHeader>
        <div>
          <h1>면접 신청 조회</h1>
          <HeaderSummary>총 {slots.length}개 슬롯 · 신청 {applicantCount}명 · 마감 {closedCount}개</HeaderSummary>
        </div>
      </PageHeader>
      {loading && <Spinner />}
      {!loading && (
        <>
          <DateFilterBar aria-label="면접 날짜 필터">
            <DateFilterButton type="button" data-active={selectedDate === 'all'} onClick={() => setSelectedDate('all')}>전체</DateFilterButton>
            {groups.map((group) => <DateFilterButton key={group.date} type="button" data-active={selectedDate === group.date} onClick={() => setSelectedDate(group.date)}>{group.date}</DateFilterButton>)}
          </DateFilterBar>
          <InterviewTableWrapper>
            <InterviewTable>
              <thead><tr><th>날짜</th><th>시간</th><th>신청 / 정원</th><th>상태</th><th>신청자</th></tr></thead>
              <tbody>
                {slots.map((slot) => <SlotRow key={slot.slotId} slot={slot} date={slot.date} expanded={expandedSlotId === slot.slotId} onToggle={() => setExpandedSlotId((current) => current === slot.slotId ? null : slot.slotId)} handleCancelInterview={handleCancelInterview} />)}
                {slots.length === 0 && <tr><td colSpan="5"><EmptyState>등록된 면접 슬롯이 없습니다.</EmptyState></td></tr>}
              </tbody>
            </InterviewTable>
          </InterviewTableWrapper>
        </>
      )}
    </WhiteNarrowBlock>
  );
};

export default AdminInterview;
