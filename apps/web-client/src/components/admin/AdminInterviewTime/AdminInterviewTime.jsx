import { useState } from 'react';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import ActionButton from '../../common/Buttons/ActionButton';
import Spinner from '../../common/Spinner/Spinner';
import { TitleContainer } from '../AdminBook/AdminBook.styles';
import { notEmptyValidation } from '../../../lib/utils/validation';
import {
  Form,
  StyledCapacityForm,
  StyledCapacityInput,
  StyledDateForm,
  StyledDateInput,
  StyledDateTimeForm,
  StyledDiv,
  StyledInterviewForm,
  StyledLabel,
  StyledTimeForm,
  StyledTimeFormList,
  StyledTimeInput,
  TimeBlockId,
  TimeCapacityButtonContainer,
} from './AdminInterviewTime.styles';
import useInput from '../../../hooks/useInput';
import { StyledDeleteButton } from '../../activity/ActivityCard/ActivityCard.styles';
import { StyledButton } from '~/components/board-legacy/Post/Post.styles';

const DateTimeForm = ({
  id,
  date,
  startTime,
  endTime,
  capacity,
  currentIntervieweesCount,
  onCreateInterviewTime,
  onDeleteInterviewTime,
  onUpdateInterviewTime,
}) => {
  const [start, onChangeStart] = useInput(
    startTime ? startTime : '',
    notEmptyValidation,
  );
  const [end, onChangeEnd] = useInput(
    endTime ? endTime : '',
    notEmptyValidation,
  );
  const [capa, onChangeCapa] = useInput(
    capacity ? capacity : '',
    notEmptyValidation,
  );

  const handleCreateInterviewTime = (e) => {
    e.preventDefault();
    onCreateInterviewTime({
      date,
      startTime: start,
      endTime: end,
      capacity: capa,
    });
  };

  const handleUpdateInterviewTime = (e) => {
    e.preventDefault();
    onUpdateInterviewTime({
      slotId: id,
      startTime: start,
      endTime: end,
      capacity: capa,
    });
  };

  const handleDeleteInterviewTime = (e) => {
    e.preventDefault();
    onDeleteInterviewTime({ slotId: id });
  };

  return (
    <StyledDateTimeForm>
      {id && (
        <>
          <TimeBlockId>
            <p>슬롯 ID</p>
            <p className="admin-interview-slot-id">{id}</p>
          </TimeBlockId>
        </>
      )}
      <StyledTimeForm>
        <StyledLabel htmlFor="interview-start-time">시작 시간</StyledLabel>
        <StyledTimeInput
          type="time"
          name="interview-start-time"
          id=""
          value={start}
          onChange={onChangeStart}
        />
      </StyledTimeForm>
      <StyledTimeForm>
        <StyledLabel htmlFor="interview-end-time">종료 시간</StyledLabel>
        <StyledTimeInput
          type="time"
          name="interview-start-time"
          id=""
          value={end}
          onChange={onChangeEnd}
        />
      </StyledTimeForm>
      <StyledCapacityForm>
        현재 신청 인원 {currentIntervieweesCount} 명
      </StyledCapacityForm>
      <StyledCapacityForm>
        <StyledLabel htmlFor="interview-capacity">정원</StyledLabel>
        <StyledCapacityInput
          type="number"
          name="interview-capacity"
          id=""
          value={capa}
          onChange={onChangeCapa}
        />
        <span>명</span>
      </StyledCapacityForm>
      <TimeCapacityButtonContainer>
        <StyledButton
          onClick={id ? handleUpdateInterviewTime : handleCreateInterviewTime}
        >
          {id ? '수정' : '제출'}
        </StyledButton>
        <StyledDeleteButton onClick={handleDeleteInterviewTime}>
          삭제
        </StyledDeleteButton>
      </TimeCapacityButtonContainer>
    </StyledDateTimeForm>
  );
};

const InterviewForm = ({
  data,
  onCreateInterviewTime,
  onDeleteInterviewTime,
  onUpdateInterviewTime,
}) => {
  const [date, onChangeDate] = useInput(
    data ? data.date : '',
    notEmptyValidation,
  );
  const [slots, setSlots] = useState(data ? data.slots : []);
  const onAddTime = (e) => {
    e.preventDefault();
    setSlots([
      ...slots,
      {
        startTime: '',
        endTime: '',
        capacity: 0,
        interviewees: [],
      },
    ]);
  };
  return (
    <StyledInterviewForm>
      <StyledDateForm>
        <StyledLabel htmlFor="interview-date">날짜</StyledLabel>
        <StyledDateInput
          type="date"
          htmlFor="interview-date"
          value={date}
          onChange={onChangeDate}
        />
      </StyledDateForm>
      <StyledTimeFormList>
        {slots.map((s) => (
          <DateTimeForm
            date={date}
            key={s.slotId ? s.slotId : date + s.startTime + s.endTime}
            id={s.slotId}
            startTime={s.startTime}
            endTime={s.endTime}
            capacity={s.capacity}
            currentIntervieweesCount={s.interviewees.length}
            onCreateInterviewTime={onCreateInterviewTime}
            onDeleteInterviewTime={onDeleteInterviewTime}
            onUpdateInterviewTime={onUpdateInterviewTime}
          />
        ))}
      </StyledTimeFormList>
      <ActionButton onClick={onAddTime}>시간 추가</ActionButton>
    </StyledInterviewForm>
  );
};

const AdminInterviewTime = ({
  data,
  loading,
  setData,
  onCreateInterviewTime,
  onDeleteInterviewTime,
  onDeleteAllInterviewTime,
  onUpdateInterviewTime,
}) => {
  const onAddDate = (e) => {
    e.preventDefault();
    setData([...data, { date: '', slots: [] }]);
  };

  const onClickDeleteAll = (e) => {
    e.preventDefault();
    let result = window.confirm(
      '[주의] 모든 면접 시간 슬롯을 삭제하시겠습니까?',
    );
    if (result) {
      onDeleteAllInterviewTime();
    }
  };

  return (
    <WhiteNarrowBlock>
      <TitleContainer>면접 시간 관리</TitleContainer>
      <StyledDiv>작성 후 '제출' 버튼을 꼭 눌러주세요.</StyledDiv>
      {loading && <Spinner />}
      {!loading && (
        <>
          <Form>
            {data?.map((d) => (
              <InterviewForm
                key={d.date}
                data={d}
                onCreateInterviewTime={onCreateInterviewTime}
                onDeleteInterviewTime={onDeleteInterviewTime}
                onUpdateInterviewTime={onUpdateInterviewTime}
              />
            ))}
          </Form>
          <ActionButton onClick={onAddDate}>날짜 추가</ActionButton>
          <StyledDeleteButton
            onClick={onClickDeleteAll}
            style={{
              marginTop: '30px',
            }}
          >
            전체 시간 삭제
          </StyledDeleteButton>
        </>
      )}
    </WhiteNarrowBlock>
  );
};

export default AdminInterviewTime;
