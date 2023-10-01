import { withRouter } from 'react-router-dom';
import { MENU } from '../../../constants/menus';
import useInput from '../../../hooks/useInput';
import { notEmptyValidation } from '../../../lib/utils/validation';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import { StyledDeleteButton } from '../../activity/ActivityCard/ActivityCard.styles';
import Input from '../../common/Input/Input';
import { StyledSearchActionButton } from '../AdminProjectForm/AdminProjectForm.styles';
import {
  ContentsContainer,
  MemberListRow,
  StyledActionButton,
  Table,
  TableHead,
  TitleContainer,
  StyledSelect,
  SearchHeader,
  SearchResult,
  MemberSearchForm,
} from './AdminMember.styles';

const MemberTableHead = () => {
  return (
    <thead>
      <TableHead>
        <th className="member_list_head name">이름</th>
        <th className="member_list_head department hide">학과</th>
        <th className="member_list_head studentId">학번</th>
        <th className="member_list_head loginId hide">아이디</th>
        <th className="member_list_head email hide">이메일</th>
        <th className="member_list_head phone hide">연락처</th>
        <th className="member_list_head isActivated">승인</th>
        <th className="member_list_head small-button">동작</th>
        <th className="member_list_head isAdmin">관리자</th>
        <th className="member_list_head small-button">동작</th>
        <th className="member_list_head status">상태</th>
      </TableHead>
    </thead>
  );
};

const Member = ({
  member,
  handleAcceptMember,
  handleWithdrawMember,
  handleToggleAdmin,
  handleUpdateMemberRole,
  roles,
  history,
}) => {
  const [role, onChangeRole] = useInput(
    member.role ? member.role : 'MEMBER',
    notEmptyValidation,
  );

  const moveToMemberDetail = () => {
    history.push(`/${MENU.MEMBER}/${member.loginID}`);
  };

  return (
    <MemberListRow key={member.loginID} onClick={moveToMemberDetail}>
      <td className="member-list-row name">{member.name}</td>
      <td className="member-list-row department hide">{member.department}</td>
      <td className="member-list-row studentId">{member.studentID}</td>
      <td className="member-list-row loginId hide">{member.loginID}</td>
      <td className="member-list-row email hide">{member.email}</td>
      <td className="member-list-row phone hide">{member.phoneNumber}</td>
      <td className="member-list-row isActivated">
        {member.isActivated ? 'o' : 'x'}
      </td>
      <td
        className="member-list-row small-button"
        onClick={(e) => e.stopPropagation()}
      >
        {member.isActivated ? (
          <StyledActionButton
            onClick={(e) => handleWithdrawMember(e, member.loginID)}
            className="delete"
          >
            탈퇴
          </StyledActionButton>
        ) : (
          <StyledActionButton
            onClick={(e) => handleAcceptMember(e, member.loginID)}
          >
            승인
          </StyledActionButton>
        )}
      </td>
      <td className="member-list-row isAdmin">{member.isAdmin ? 'o' : 'x'}</td>
      <td
        className="member-list-row small-button"
        onClick={(e) => e.stopPropagation()}
      >
        {member.isActivated &&
          (member.isAdmin ? (
            <StyledActionButton
              onClick={(e) =>
                handleToggleAdmin(e, member.loginID, member.isAdmin)
              }
            >
              해제
            </StyledActionButton>
          ) : (
            <StyledActionButton
              onClick={(e) =>
                handleToggleAdmin(e, member.loginID, member.isAdmin)
              }
            >
              임명
            </StyledActionButton>
          ))}
      </td>
      <td
        className="member-list-row status"
        onClick={(e) => e.stopPropagation()}
      >
        {member.isActivated && (
          <>
            <StyledSelect value={role} onChange={onChangeRole}>
              {roles?.map((r) => (
                <option key={r.name} value={r.name}>
                  {r.description}
                </option>
              ))}
            </StyledSelect>
            <StyledActionButton
              onClick={(e) => handleUpdateMemberRole(e, member.loginID, role)}
              style={{ marginLeft: '0.5rem' }}
            >
              수정
            </StyledActionButton>
          </>
        )}
      </td>
    </MemberListRow>
  );
};

const AdminMember = ({
  members,
  onAcceptMember,
  onWithdrawMember,
  onToggleAdmin,
  onUpdateMemberRole,
  onSearchMember,
  searchMembers,
  onDeleteUnacceptedMembers,
  roles,
  history,
}) => {
  const [searchMember, onChangeSearchMember] = useInput('', notEmptyValidation);

  const handleWithdrawMember = (e, loginID) => {
    e.preventDefault();
    onWithdrawMember(loginID);
  };

  const handleAcceptMember = (e, loginID) => {
    e.preventDefault();
    onAcceptMember(loginID);
  };

  const handleToggleAdmin = (e, loginID, isAdmin) => {
    e.preventDefault();
    onToggleAdmin({ loginID, isAdmin });
  };

  const handleUpdateMemberRole = (e, loginID, role) => {
    e.preventDefault();
    onUpdateMemberRole({ loginID, role });
  };

  const handleDeleteUnacceptedMembers = (e) => {
    e.preventDefault();
    let result = window.confirm(
      `[주의] 승인 전 회원들을 모두 탈퇴 처리 하시겠습니까? 정보는 모두 DB에서 삭제되며 복구할 수 없습니다.`,
    );
    if (result) {
      onDeleteUnacceptedMembers();
    }
  };

  const onClickSearch = (e) => {
    e.preventDefault();
    onSearchMember(searchMember);
    e.target.value = '';
    onChangeSearchMember(e);
  };

  return (
    <WhiteNarrowBlock>
      <TitleContainer>회원 관리</TitleContainer>
      <ContentsContainer>
        <MemberSearchForm onSubmit={onClickSearch}>
          <Input
            valueText={searchMember}
            labelText=""
            typeText="text"
            nameText="id"
            onChangeFunc={onChangeSearchMember}
            placeholderText="회원 이름으로 검색"
          />
          <StyledSearchActionButton>검색</StyledSearchActionButton>
        </MemberSearchForm>
        <SearchHeader>회원 검색 결과</SearchHeader>
        {searchMembers.length === 0 && (
          <SearchResult>검색 결과가 없습니다</SearchResult>
        )}
        {searchMembers.length !== 0 && (
          <Table>
            <MemberTableHead />
            <tbody>
              {searchMembers.map((member) => (
                <Member
                  key={member.loginID}
                  member={member}
                  handleAcceptMember={handleAcceptMember}
                  handleWithdrawMember={handleWithdrawMember}
                  handleToggleAdmin={handleToggleAdmin}
                  handleUpdateMemberRole={handleUpdateMemberRole}
                  roles={roles}
                  history={history}
                />
              ))}
            </tbody>
          </Table>
        )}
        <SearchHeader>
          승인 전 회원 목록
          <span>
            <StyledDeleteButton onClick={handleDeleteUnacceptedMembers}>
              전체 삭제
            </StyledDeleteButton>
          </span>
        </SearchHeader>
        <Table>
          <MemberTableHead />
          <tbody>
            {members
              .filter((m) => m.role === 'UNACCEPTED')
              .map((member) => {
                return (
                  <Member
                    key={member.loginID}
                    member={member}
                    handleAcceptMember={handleAcceptMember}
                    handleWithdrawMember={handleWithdrawMember}
                    handleToggleAdmin={handleToggleAdmin}
                    handleUpdateMemberRole={handleUpdateMemberRole}
                    roles={roles}
                    history={history}
                  />
                );
              })}
          </tbody>
        </Table>
        <SearchHeader>일반 회원 목록</SearchHeader>
        <Table>
          <MemberTableHead />
          <tbody>
            {members
              .filter((m) => m.role === 'MEMBER')
              .map((member) => {
                return (
                  <Member
                    key={member.loginID}
                    member={member}
                    handleAcceptMember={handleAcceptMember}
                    handleWithdrawMember={handleWithdrawMember}
                    handleToggleAdmin={handleToggleAdmin}
                    handleUpdateMemberRole={handleUpdateMemberRole}
                    roles={roles}
                    history={history}
                  />
                );
              })}
          </tbody>
        </Table>
        <SearchHeader>졸업/수료 회원 목록</SearchHeader>
        <Table>
          <MemberTableHead />
          <tbody>
            {members
              .filter((m) => m.role === 'GRADUATED' || m.role === 'COMPLETE')
              .map((member) => {
                return (
                  <Member
                    key={member.loginID}
                    member={member}
                    handleAcceptMember={handleAcceptMember}
                    handleWithdrawMember={handleWithdrawMember}
                    handleToggleAdmin={handleToggleAdmin}
                    handleUpdateMemberRole={handleUpdateMemberRole}
                    roles={roles}
                    history={history}
                  />
                );
              })}
          </tbody>
        </Table>
        <SearchHeader>활동 회원 목록</SearchHeader>
        <Table>
          <MemberTableHead />
          <tbody>
            {members
              .filter((m) => m.isActivated)
              .map((member) => {
                return (
                  <Member
                    key={member.loginID}
                    member={member}
                    handleAcceptMember={handleAcceptMember}
                    handleWithdrawMember={handleWithdrawMember}
                    handleToggleAdmin={handleToggleAdmin}
                    handleUpdateMemberRole={handleUpdateMemberRole}
                    roles={roles}
                    history={history}
                  />
                );
              })}
          </tbody>
        </Table>
        <SearchHeader>비활동 회원 목록</SearchHeader>
        <Table>
          <MemberTableHead />
          <tbody>
            {members
              .filter((m) => !m.isActivated)
              .map((member) => {
                return (
                  <Member
                    key={member.loginID}
                    member={member}
                    handleAcceptMember={handleAcceptMember}
                    handleWithdrawMember={handleWithdrawMember}
                    handleToggleAdmin={handleToggleAdmin}
                    handleUpdateMemberRole={handleUpdateMemberRole}
                    roles={roles}
                    history={history}
                  />
                );
              })}
          </tbody>
        </Table>
        <SearchHeader>전체 회원 목록</SearchHeader>
        <Table>
          <MemberTableHead />
          <tbody>
            {members.map((member) => (
              <Member
                key={member.loginID}
                member={member}
                handleAcceptMember={handleAcceptMember}
                handleWithdrawMember={handleWithdrawMember}
                handleToggleAdmin={handleToggleAdmin}
                handleUpdateMemberRole={handleUpdateMemberRole}
                roles={roles}
                history={history}
              />
            ))}
          </tbody>
        </Table>
      </ContentsContainer>
    </WhiteNarrowBlock>
  );
};

export default withRouter(AdminMember);
