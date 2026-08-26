import { useMemo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { MENU } from '../../../constants/menus';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import { SearchToolbar } from '../../common/SearchToolbar/SearchToolbar';
import { SectionTabs } from '../../common/SectionTabs/SectionTabs';
import {
  AccountActionButton,
  AccountActions,
  EmptyResult,
  FilterControl,
  MemberIdentity,
  MemberListRow,
  MemberTable,
  MemberTableContainer,
  PageHeader,
  RoleActionButton,
  RoleSelect,
  StatusBadge,
  TableHead,
  TabFilterRow,
  Title,
  ToolbarActions,
} from './AdminMember.styles';

const MEMBER_TAB = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ALL: 'ALL',
};

const MEMBER_SEARCH_OPTIONS = [
  { value: 'ALL', label: '전체' },
  { value: 'NAME', label: '이름' },
  { value: 'LOGIN_ID', label: '아이디' },
  { value: 'STUDENT_ID', label: '학번' },
  { value: 'EMAIL', label: '이메일' },
];

const INACTIVE_ROLES = ['INACTIVE', 'EXPELLED', 'QUIT', 'PUBLIC'];

const getMemberTab = (member) => {
  if (member.role === 'UNACCEPTED') return MEMBER_TAB.PENDING;
  if (!member.isActivated || INACTIVE_ROLES.includes(member.role)) return MEMBER_TAB.INACTIVE;
  return MEMBER_TAB.ACTIVE;
};

const MemberTableHead = () => (
  <thead>
    <TableHead>
      <th>회원</th>
      <th>학과</th>
      <th>학번</th>
      <th>연락처</th>
      <th>회원 상태</th>
      <th>계정 조치</th>
    </TableHead>
  </thead>
);

const MemberRow = ({ member, roles, onAcceptMember, onWithdrawMember, onUpdateMemberRole, history }) => {
  const isPending = getMemberTab(member) === MEMBER_TAB.PENDING;

  const stopRowNavigation = (event) => event.stopPropagation();
  const moveToMemberDetail = () => history.push(`/${MENU.MEMBER}/${member.loginID}`);
  const roleDescription = roles?.find((item) => item.name === member.role)?.description ?? member.role;

  return (
    <MemberListRow onClick={moveToMemberDetail}>
      <td>
        <MemberIdentity>
          <strong>{member.name}</strong>
          <span>{member.loginID}</span>
        </MemberIdentity>
      </td>
      <td>{member.department || '-'}</td>
      <td>{member.studentID || '-'}</td>
      <td>{member.phoneNumber || '-'}</td>
      <td onClick={stopRowNavigation}>
        {member.isActivated ? (
          <RoleSelect value={member.role || 'MEMBER'} onChange={(event) => onUpdateMemberRole({ loginID: member.loginID, role: event.target.value })} aria-label={`${member.name} 회원 상태`}>
            {roles?.map((item) => (
              <option key={item.name} value={item.name}>
                {item.description}
              </option>
            ))}
          </RoleSelect>
        ) : (
          <StatusBadge>{isPending ? '승인 대기' : roleDescription}</StatusBadge>
        )}
      </td>
      <td onClick={stopRowNavigation}>
        <AccountActions>
          {isPending && <RoleActionButton onClick={() => onAcceptMember(member.loginID)}>승인</RoleActionButton>}
          <AccountActionButton onClick={() => onWithdrawMember(member.loginID)}>{isPending ? '삭제' : '탈퇴 처리'}</AccountActionButton>
        </AccountActions>
      </td>
    </MemberListRow>
  );
};

const AdminMember = ({ members, onAcceptMember, onWithdrawMember, onUpdateMemberRole, roles, history }) => {
  const [activeTab, setActiveTab] = useState(MEMBER_TAB.PENDING);
  const [searchType, setSearchType] = useState('ALL');
  const [keyword, setKeyword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const tabCounts = useMemo(
    () =>
      members.reduce(
        (counts, member) => {
          counts[getMemberTab(member)] += 1;
          counts[MEMBER_TAB.ALL] += 1;
          return counts;
        },
        { [MEMBER_TAB.PENDING]: 0, [MEMBER_TAB.ACTIVE]: 0, [MEMBER_TAB.INACTIVE]: 0, [MEMBER_TAB.ALL]: 0 },
      ),
    [members],
  );

  const visibleMembers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return members.filter((member) => {
      const isInTab = activeTab === MEMBER_TAB.ALL || getMemberTab(member) === activeTab;
      const matchesRole = roleFilter === 'ALL' || member.role === roleFilter;
      const searchFieldByType = {
        ALL: [member.name, member.loginID, member.email, member.studentID, member.department],
        NAME: [member.name],
        LOGIN_ID: [member.loginID],
        STUDENT_ID: [member.studentID],
        EMAIL: [member.email],
      };
      const searchableValues = searchFieldByType[searchType].filter(Boolean).join(' ').toLowerCase();
      const matchesQuery = !normalizedQuery || searchableValues.includes(normalizedQuery);

      return isInTab && matchesRole && matchesQuery;
    });
  }, [activeTab, members, roleFilter, searchQuery, searchType]);

  const tabs = [
    { key: MEMBER_TAB.PENDING, label: `승인 대기 ${tabCounts[MEMBER_TAB.PENDING]}` },
    { key: MEMBER_TAB.ACTIVE, label: `활동 ${tabCounts[MEMBER_TAB.ACTIVE]}` },
    { key: MEMBER_TAB.INACTIVE, label: `비활동 ${tabCounts[MEMBER_TAB.INACTIVE]}` },
    { key: MEMBER_TAB.ALL, label: `전체 ${tabCounts[MEMBER_TAB.ALL]}` },
  ];

  return (
    <WhiteNarrowBlock>
      <PageHeader>
        <div>
          <Title>회원 관리</Title>
        </div>
        <ToolbarActions>
          <SearchToolbar
            options={MEMBER_SEARCH_OPTIONS}
            searchType={searchType}
            keyword={keyword}
            placeholder="회원 검색"
            onSearchTypeChange={setSearchType}
            onKeywordChange={setKeyword}
            onSearch={() => setSearchQuery(keyword)}
          />
        </ToolbarActions>
      </PageHeader>
      <TabFilterRow>
        <SectionTabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
        <FilterControl value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} aria-label="회원 상태 필터">
          <option value="ALL">모든 상태</option>
          {roles?.map((role) => (
            <option key={role.name} value={role.name}>
              {role.description}
            </option>
          ))}
        </FilterControl>
      </TabFilterRow>
      <MemberTableContainer>
        <MemberTable>
          <MemberTableHead />
          <tbody>
            {visibleMembers.map((member) => (
              <MemberRow
                key={member.loginID}
                member={member}
                roles={roles}
                onAcceptMember={onAcceptMember}
                onWithdrawMember={onWithdrawMember}
                onUpdateMemberRole={onUpdateMemberRole}
                history={history}
              />
            ))}
          </tbody>
        </MemberTable>
        {visibleMembers.length === 0 && <EmptyResult>조건에 맞는 회원이 없습니다.</EmptyResult>}
      </MemberTableContainer>
    </WhiteNarrowBlock>
  );
};

export default withRouter(AdminMember);
