import { useState } from 'react';
import { Block, WhiteBlock } from '../../../styles/common/Block.styles';
import Spinner from '../../common/Spinner/Spinner';
import {
  DisabledActionButton,
  InterviewWarningBlock,
  StyledDateBlock,
  StyledTimeBlock,
  StyledTimeList,
  TimeBlockCapacity,
  TimeBlockTime,
} from './Interview.styles';
import ActionButton from '../../common/Buttons/ActionButton';
import { useSelector } from 'react-redux';
import { StyledDeleteButton } from '../../activity/ActivityCard/ActivityCard.styles';
import { getHourMinuteString } from '../../../lib/utils/getDateString';
import InterviewSelectModal from './InterviewModal/InterviewSelectModal';
import InterviewCancelModal from './InterviewModal/InterviewCancelModal';
import { MEMBER_ROLE } from '../../../constants/memberRoles';
import LinkButton from '../../common/Buttons/LinkButton';

const TimeBlock = ({
  date,
  startTime,
  endTime,
  capacity,
  num,
  mySlotId,
  id,
  handleSelectInterviewTime,
  handleCancelInterviewTime,
}) => {
  const member = useSelector((state) => state.auth);
  const role = member.user.role;
  const isLogin = member.status.isLogin;
  const loginId = member.user.memberId;

  const [selectModalVisible, setSelectModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const onSelectInterviewTime = (e) => {
    e.preventDefault();
    setSelectModalVisible(true);
    //handleSelectInterviewTime({ slotId: id });
  };

  const onConfirmSelect = (e) => {
    e.preventDefault();
    handleSelectInterviewTime({ slotId: id });
    setSelectModalVisible(false);
  };

  const onCloseSelectModal = (e) => {
    e.preventDefault();
    setSelectModalVisible(false);
  };

  const onCancelInterviewTime = (e) => {
    e.preventDefault();
    setCancelModalVisible(true);
    //handleCancelInterviewTime({ slotId: id });
  };

  const onConfirmCancel = (e) => {
    e.preventDefault();
    handleCancelInterviewTime({ loginId });
    setCancelModalVisible(false);
  };

  const onCloseCancelModal = (e) => {
    e.preventDefault();
    setCancelModalVisible(false);
  };

  return (
    <>
      <InterviewSelectModal
        date={date}
        startTime={startTime}
        endTime={endTime}
        visible={selectModalVisible}
        onConfirm={onConfirmSelect}
        onCancel={onCloseSelectModal}
      />
      <InterviewCancelModal
        date={date}
        startTime={startTime}
        endTime={endTime}
        visible={cancelModalVisible}
        onConfirm={onConfirmCancel}
        onCancel={onCloseCancelModal}
      />
      <StyledTimeBlock>
        <TimeBlockTime>
          {getHourMinuteString(startTime)} ~ {getHourMinuteString(endTime)}
        </TimeBlockTime>
        <TimeBlockCapacity>
          {num < capacity && '신청가능'}
          {num >= capacity && '신청불가'}
        </TimeBlockCapacity>
        {isLogin && role === MEMBER_ROLE.UNACCEPTED && (
          <>
            {mySlotId === null && capacity > num && (
              <div>
                <ActionButton onClick={onSelectInterviewTime}>
                  신청
                </ActionButton>
              </div>
            )}
            {mySlotId !== id && capacity <= num && (
              <div>
                <DisabledActionButton>마감</DisabledActionButton>
              </div>
            )}
            {mySlotId === id && (
              <StyledDeleteButton onClick={onCancelInterviewTime}>
                취소
              </StyledDeleteButton>
            )}
          </>
        )}
      </StyledTimeBlock>
    </>
  );
};

const DateBlock = ({
  data,
  loginId,
  mySlotId,
  handleSelectInterviewTime,
  handleCancelInterviewTime,
}) => {
  return (
    <>
      <StyledDateBlock>{data?.date}</StyledDateBlock>
      <StyledTimeList>
        {data?.slots.map((d) => {
          return (
            <TimeBlock
              key={d.slotId}
              id={d.slotId}
              date={data?.date}
              startTime={d.startTime}
              endTime={d.endTime}
              capacity={d.capacity}
              num={d.interviewees.length}
              interviewees={d.interviewees}
              loginId={loginId}
              mySlotId={mySlotId}
              handleSelectInterviewTime={handleSelectInterviewTime}
              handleCancelInterviewTime={handleCancelInterviewTime}
            />
          );
        })}
      </StyledTimeList>
    </>
  );
};

const Interview = ({
  loading,
  data,
  mySlotId,
  handleSelectInterviewTime,
  handleCancelInterviewTime,
}) => {
  const member = useSelector((state) => state.auth);
  //const role = member.user.role;
  const isLogin = member.status.isLogin;

  const loginId = member.user.memberId;

  return (
    <Block>
      <WhiteBlock>
        <h2 className="block_title">면접 시간 제출</h2>
        {loading && <Spinner />}
        {!loading && !isLogin && (
          <InterviewWarningBlock>
            <p>회원가입 후 로그인을 하셔야 면접 신청이 가능합니다.</p>
            <LinkButton className="right-menu" to="/register">
              회원가입 하러 가기
            </LinkButton>
            <ActionButton className="right-menu sign-in" to="/login">
              로그인
            </ActionButton>
          </InterviewWarningBlock>
        )}
        {!loading && (
          <>
            {data?.map((d) => {
              return (
                <DateBlock
                  key={d.date}
                  data={d}
                  loginId={loginId}
                  mySlotId={mySlotId}
                  handleSelectInterviewTime={handleSelectInterviewTime}
                  handleCancelInterviewTime={handleCancelInterviewTime}
                />
              );
            })}
          </>
        )}
      </WhiteBlock>
    </Block>
  );
};

export default Interview;
