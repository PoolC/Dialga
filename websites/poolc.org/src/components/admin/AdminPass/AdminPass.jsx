import { useMemo, useState } from 'react';
import { Popconfirm } from 'antd';
import { withRouter } from 'react-router';
import ActionButton from '../../common/Buttons/ActionButton';
import { SectionTabs } from '../../common/SectionTabs/SectionTabs';
import {
  ActionCell,
  EmptyResult,
  ExpellActionButton,
  MemberIdentity,
  MemberListRow,
  ResultTable,
  ResultTableContainer,
  SettingsPanel,
  SettingsRow,
  StatusChip,
  TableHead,
  Title,
  TitleRow,
  Toolbar,
} from './AdminPass.styles';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import useInput from '../../../hooks/useInput';
import { notEmptyValidation } from '../../../lib/utils/validation';
import { MENU } from '../../../constants/menus';

const TAB = {
  AT_RISK: 'AT_RISK',
  MAINTAINED: 'MAINTAINED',
  ALL: 'ALL',
};

const getJudgement = (member, minimumLimit) => {
  if (member.isExcepted) return 'EXEMPTED';
  return member.hour >= minimumLimit ? 'MAINTAINED' : 'AT_RISK';
};

const MemberRow = ({ member, minimumLimit, handleChangeExcepted, handleWithdraw, history }) => {
  const [isExpelled, setIsExpelled] = useState(member.member.role === 'EXPELLED');
  const judgement = getJudgement(member, minimumLimit);

  const moveToMemberDetail = () => {
    history.push(`/${MENU.MEMBER}/${member.member.loginID}`);
  };

  const statusLabel = {
    EXEMPTED: '면제',
    MAINTAINED: '유지 예정',
    AT_RISK: '상실 예정',
  }[judgement];

  return (
    <MemberListRow onClick={moveToMemberDetail}>
      <td>
        <MemberIdentity>
          <strong>{member.member.name}</strong>
          <span>{member.member.loginID}</span>
        </MemberIdentity>
      </td>
      <td>{member.member.studentID || '-'}</td>
      <td>{member.member.department || '-'}</td>
      <td>{member.hour}시간</td>
      <td>
        <StatusChip type={judgement}>{statusLabel}</StatusChip>
      </td>
      <td onClick={(event) => event.stopPropagation()}>
        <ActionCell>
          <ActionButton onClick={() => handleChangeExcepted(member.member.loginID, member.isExcepted)}>{member.isExcepted ? '면제 해제' : '면제 처리'}</ActionButton>
          {judgement === 'AT_RISK' && !isExpelled && (
            <Popconfirm
              title="회원 자격 박탈"
              description={`${member.member.name} 회원의 자격을 정말 박탈하시겠습니까?`}
              okText="박탈"
              cancelText="취소"
              okButtonProps={{ danger: true }}
              onConfirm={() => handleWithdraw(member.member.loginID, setIsExpelled)}
            >
              <ExpellActionButton>자격 박탈</ExpellActionButton>
            </Popconfirm>
          )}
          {isExpelled && <span className="expelled">자격 박탈됨</span>}
        </ActionCell>
      </td>
    </MemberListRow>
  );
};

const AdminPass = ({ members, onSubmit, onChangeExcepted, onWithdraw, history }) => {
  const [minimumLimit, onChangeMinimumLimit] = useInput('', notEmptyValidation);
  const [activeTab, setActiveTab] = useState(TAB.AT_RISK);
  const numericMinimumLimit = Number(minimumLimit);
  const activeMembers = useMemo(() => members?.filter((member) => member.member.isActivated) || [], [members]);
  const atRiskMembers = useMemo(
    () => activeMembers.filter((member) => !member.isExcepted && member.hour < numericMinimumLimit),
    [activeMembers, numericMinimumLimit],
  );
  const maintainedMembers = useMemo(
    () => activeMembers.filter((member) => member.isExcepted || member.hour >= numericMinimumLimit),
    [activeMembers, numericMinimumLimit],
  );

  const tabItems = [
    { key: TAB.AT_RISK, label: `상실 예정 ${atRiskMembers.length}` },
    { key: TAB.MAINTAINED, label: `유지 예정 ${maintainedMembers.length}` },
    { key: TAB.ALL, label: `전체 ${activeMembers.length}` },
  ];

  const visibleMembers = {
    [TAB.AT_RISK]: atRiskMembers,
    [TAB.MAINTAINED]: maintainedMembers,
    [TAB.ALL]: activeMembers,
  }[activeTab];

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <WhiteNarrowBlock>
      <TitleRow>
        <Title>최소 활동 기준 관리</Title>
        <SettingsPanel onSubmit={handleSubmit}>
          <label htmlFor="minimum-activity-hours">최소 활동 기준</label>
          <SettingsRow>
            <input id="minimum-activity-hours" value={minimumLimit} onChange={onChangeMinimumLimit} type="number" min="0" placeholder="예: 10" />
            <span>시간</span>
            <ActionButton type="submit">조회</ActionButton>
          </SettingsRow>
        </SettingsPanel>
      </TitleRow>

      <Toolbar>
        <SectionTabs items={tabItems} activeKey={activeTab} onChange={setActiveTab} />
      </Toolbar>

      <ResultTableContainer>
        <ResultTable>
          <thead>
            <TableHead>
              <th>회원</th>
              <th>학번</th>
              <th>학과</th>
              <th>인정 활동 시간</th>
              <th>판정</th>
              <th>조치</th>
            </TableHead>
          </thead>
          <tbody>
            {visibleMembers.map((member) => (
              <MemberRow
                key={member.member.loginID}
                member={member}
                minimumLimit={numericMinimumLimit}
                handleChangeExcepted={onChangeExcepted}
                handleWithdraw={onWithdraw}
                history={history}
              />
            ))}
          </tbody>
        </ResultTable>
        {members !== null && visibleMembers.length === 0 && <EmptyResult>해당하는 회원이 없습니다.</EmptyResult>}
        {members === null && <EmptyResult>기준 시간을 입력하고 조회하면 회원 판정 결과를 확인할 수 있습니다.</EmptyResult>}
      </ResultTableContainer>
    </WhiteNarrowBlock>
  );
};

export default withRouter(AdminPass);
