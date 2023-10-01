import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import {
  IntervieweeInfo,
  IntervieweeList,
  StyledDateBlock,
  StyledTimeBlock,
  StyledTimeList,
  TimeBlockCapacity,
  TimeBlockId,
  TimeBlockTime,
} from './AdminInterview.styles';
import Spinner from '../../common/Spinner/Spinner';
import { TitleContainer } from '../AdminBook/AdminBook.styles';
import { getHourMinuteString } from '../../../lib/utils/getDateString';
import { StyledDeleteButton } from '../../activity/ActivityCard/ActivityCard.styles';

const Interviewee = ({ interviewee, handleCancelInterview }) => {
  const onClickDelete = (e) => {
    e.preventDefault();
    let result = window.confirm(
      `[주의] ${interviewee.name}님의 면접 신청을 취소하시겠습니까?`,
    );
    if (result) {
      handleCancelInterview({ loginId: interviewee.loginID });
    }
  };

  return (
    <IntervieweeList>
      <IntervieweeInfo>
        <div>
          <span className="admin-interview-label">이름 </span>{' '}
          {interviewee.name}
        </div>
        <div>
          <span className="admin-interview-label">학번 </span>{' '}
          {interviewee.studentID}
        </div>
        <div>
          <span className="admin-interview-label">학과 </span>{' '}
          {interviewee.department}
        </div>
        <div>
          <span className="admin-interview-label">연락처 </span>{' '}
          {interviewee.phoneNumber}
        </div>
      </IntervieweeInfo>
      <StyledDeleteButton onClick={onClickDelete}>
        면접 신청 취소
      </StyledDeleteButton>
    </IntervieweeList>
  );
};

const TimeBlock = ({
  id,
  startTime,
  endTime,
  capacity,
  num,
  interviewees,
  handleCancelInterview,
}) => {
  return (
    <StyledTimeBlock>
      <TimeBlockId>
        <p>슬롯 ID </p>
        <p className="admin-interview-slot-id">{id}</p>
        <p></p>
      </TimeBlockId>
      <TimeBlockTime>
        {getHourMinuteString(startTime)} ~ {getHourMinuteString(endTime)}
      </TimeBlockTime>
      <TimeBlockCapacity>
        {num}명/{capacity}명
      </TimeBlockCapacity>
      {interviewees.map((i) => (
        <Interviewee
          key={i.studentID}
          interviewee={i}
          handleCancelInterview={handleCancelInterview}
        />
      ))}
    </StyledTimeBlock>
  );
};

const DateBlock = ({ data, handleCancelInterview }) => {
  return (
    <>
      <StyledDateBlock>{data?.date}</StyledDateBlock>
      <StyledTimeList>
        {data?.slots.map((d) => (
          <TimeBlock
            key={d.slotId}
            id={d.slotId}
            startTime={d.startTime}
            endTime={d.endTime}
            capacity={d.capacity}
            num={d.interviewees.length}
            interviewees={d.interviewees}
            handleCancelInterview={handleCancelInterview}
          />
        ))}
      </StyledTimeList>
    </>
  );
};

const AdminInterview = ({ loading, data, handleCancelInterview }) => {
  return (
    <WhiteNarrowBlock>
      <TitleContainer>면접 신청 조회</TitleContainer>
      {loading && <Spinner />}
      {!loading && (
        <>
          {data?.data?.map((d) => (
            <DateBlock
              key={d.date}
              data={d}
              handleCancelInterview={handleCancelInterview}
            />
          ))}
        </>
      )}
    </WhiteNarrowBlock>
  );
};

export default AdminInterview;
