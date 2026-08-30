import { useState } from 'react';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import ActionButton from '../../common/Buttons/ActionButton';
import { SectionTabs } from '../../common/SectionTabs/SectionTabs';
import Spinner from '../../common/Spinner/Spinner';
import { notEmptyValidation } from '../../../lib/utils/validation';
import useInput from '../../../hooks/useInput';
import { StyledDeleteButton } from '../../activity/ActivityCard/ActivityCard.styles';
import {
  AddSlotButton,
  DateGroup,
  DateGroupHeader,
  DateGroupMeta,
  DateInput,
  DateLabel,
  DateList,
  DateSection,
  EmptySlotState,
  HeaderActions,
  PageHeader,
  Title,
  SlotActions,
  SlotCapacity,
  SlotInput,
  SlotTable,
  SlotTableWrapper,
  StatusBadge,
} from './AdminInterviewTime.styles';

const getSlotStatus = (applicantCount, capacity) => {
  if (applicantCount === 0) return { label: '비어 있음', tone: 'empty' };
  if (applicantCount >= Number(capacity)) return { label: '마감', tone: 'closed' };
  return { label: '모집 중', tone: 'open' };
};

const SlotRow = ({ id, date, startTime, endTime, capacity, applicantCount, onCreateInterviewTime, onDeleteInterviewTime, onDiscard, onUpdateInterviewTime }) => {
  const [start, onChangeStart] = useInput(startTime || '', notEmptyValidation);
  const [end, onChangeEnd] = useInput(endTime || '', notEmptyValidation);
  const [capa, onChangeCapa] = useInput(capacity || '', notEmptyValidation);
  const status = getSlotStatus(applicantCount, capa);

  const save = (event) => {
    event.preventDefault();
    const payload = { date, startTime: start, endTime: end, capacity: capa };
    if (id) {
      onUpdateInterviewTime({ slotId: id, ...payload });
      return;
    }
    onCreateInterviewTime(payload);
  };

  const remove = (event) => {
    event.preventDefault();
    const message = applicantCount > 0
      ? `현재 ${applicantCount}명이 신청한 슬롯입니다. 정말 삭제하시겠습니까?`
      : '이 면접 슬롯을 삭제하시겠습니까?';
    if (window.confirm(message)) onDeleteInterviewTime({ slotId: id });
  };

  return (
    <tr>
      <td>{id ? `#${id}` : '새 슬롯'}</td>
      <td><SlotInput type="time" value={start} onChange={onChangeStart} aria-label="시작 시간" /></td>
      <td><SlotInput type="time" value={end} onChange={onChangeEnd} aria-label="종료 시간" /></td>
      <td><SlotCapacity><strong>{applicantCount}</strong> / <SlotInput type="number" min="1" value={capa} onChange={onChangeCapa} aria-label="정원" />명</SlotCapacity></td>
      <td><StatusBadge data-tone={status.tone}>{status.label}</StatusBadge></td>
      <td>
        <SlotActions>
          <ActionButton type="button" onClick={save}>{id ? '저장' : '추가'}</ActionButton>
          {id ? <StyledDeleteButton onClick={remove}>삭제</StyledDeleteButton> : <StyledDeleteButton onClick={onDiscard}>취소</StyledDeleteButton>}
        </SlotActions>
      </td>
    </tr>
  );
};

const InterviewForm = ({ data, onCreateInterviewTime, onDeleteInterviewTime, onUpdateInterviewTime }) => {
  const [date, onChangeDate] = useInput(data ? data.date : '', notEmptyValidation);
  const [draftSlots, setDraftSlots] = useState([]);
  const slots = data?.slots || [];

  return (
    <DateGroup>
      <DateGroupHeader>
        <DateLabel>날짜 <DateInput type="date" value={date} onChange={onChangeDate} /></DateLabel>
        <DateGroupMeta>{slots.length}개 슬롯</DateGroupMeta>
        <AddSlotButton onClick={() => setDraftSlots((current) => [...current, { key: `${Date.now()}-${current.length}` }])}>슬롯 추가</AddSlotButton>
      </DateGroupHeader>
      <SlotTableWrapper>
        <SlotTable>
          <thead><tr><th>슬롯</th><th>시작</th><th>종료</th><th>신청 / 정원</th><th>상태</th><th>조치</th></tr></thead>
          <tbody>
            {slots.map((slot) => <SlotRow key={slot.slotId} id={slot.slotId} date={date} startTime={slot.startTime} endTime={slot.endTime} capacity={slot.capacity} applicantCount={slot.interviewees.length} onCreateInterviewTime={onCreateInterviewTime} onDeleteInterviewTime={onDeleteInterviewTime} onUpdateInterviewTime={onUpdateInterviewTime} />)}
            {draftSlots.map((slot) => <SlotRow key={slot.key} date={date} startTime="" endTime="" capacity="1" applicantCount={0} onCreateInterviewTime={onCreateInterviewTime} onDeleteInterviewTime={onDeleteInterviewTime} onDiscard={() => setDraftSlots((current) => current.filter((draft) => draft.key !== slot.key))} onUpdateInterviewTime={onUpdateInterviewTime} />)}
            {slots.length === 0 && draftSlots.length === 0 && <tr><td colSpan="6"><EmptySlotState>등록된 슬롯이 없습니다. 슬롯 추가를 눌러 등록하세요.</EmptySlotState></td></tr>}
          </tbody>
        </SlotTable>
      </SlotTableWrapper>
    </DateGroup>
  );
};

const AdminInterviewTime = ({ data, loading, setData, onCreateInterviewTime, onDeleteInterviewTime, onDeleteAllInterviewTime, onUpdateInterviewTime }) => {
  const [activeDate, setActiveDate] = useState('all');
  const totalSlots = data.reduce((sum, group) => sum + group.slots.length, 0);
  const addDate = () => setData((current) => [...current, { date: '', slots: [] }]);
  const visibleGroups = activeDate === 'all' ? data : data.filter((group) => group.date === activeDate);
  const dateTabs = [
    { key: 'all', label: `전체 ${totalSlots}` },
    ...data.map((group) => ({ key: group.date, label: group.date })),
  ];
  const deleteAll = () => {
    if (window.confirm('모든 면접 시간 슬롯과 신청 정보를 삭제하시겠습니까?')) onDeleteAllInterviewTime();
  };

  return (
    <WhiteNarrowBlock>
      <PageHeader>
        <div><Title>면접 시간 관리</Title></div>
        <HeaderActions><ActionButton onClick={addDate}>날짜 추가</ActionButton></HeaderActions>
      </PageHeader>
      {loading && <Spinner />}
      {!loading && <>
        <SectionTabs items={dateTabs} activeKey={activeDate} onChange={setActiveDate} />
        <DateList>{visibleGroups.map((group, index) => <InterviewForm key={group.date || `new-date-${index}`} data={group} onCreateInterviewTime={onCreateInterviewTime} onDeleteInterviewTime={onDeleteInterviewTime} onUpdateInterviewTime={onUpdateInterviewTime} />)}{data.length === 0 && <DateSection>날짜 추가를 눌러 면접 일정을 등록하세요.</DateSection>}<DateSection><p>모든 면접 슬롯과 신청 정보를 제거합니다.</p><StyledDeleteButton onClick={deleteAll}>전체 삭제</StyledDeleteButton></DateSection></DateList>
      </>}
    </WhiteNarrowBlock>
  );
};

export default AdminInterviewTime;
