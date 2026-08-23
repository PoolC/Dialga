import { FormEvent, useMemo, useState } from 'react';
import { Button, Input } from 'antd';
import { MemberControllerService, MemberResponse, MemberRolesResponse, queryKey, useAppQuery, useAppSuspenseQuery } from '~/lib/api-v2';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import { FilterSearchToolbarOption } from '~/components/common/FilterSearchToolbar/FilterSearchToolbar';
import { EmptyState } from '~/components/common/EmptyState/EmptyState';
import { SectionTabs } from '~/components/common/SectionTabs/SectionTabs';
import { MemberCardGrid, MemberContent, MemberListBody, MemberListToolbar, MemberSearchForm } from './MemberListContent.styles';
import { ADMIN_MEMBER_ROLES, UNAUTHORIZED_MEMBER_ROLES } from '~/constants/memberRoles';
import MemberCard from '../MemberCard/MemberCard';

type MemberFilter = 'ALL' | 'ADMIN' | string;
type MemberSearchType = 'ALL' | 'NAME' | 'LOGIN_ID' | 'DEPARTMENT';

const ROLE_LABELS: Record<string, string> = {
  MEMBER: '회원',
  ADMIN: '관리자',
  SUPER_ADMIN: '최고 관리자',
  GRADUATED: '졸업생',
  COMPLETE: '수료생',
  INACTIVE: '휴학생',
};

const FALLBACK_ROLE_OPTIONS: FilterSearchToolbarOption<MemberFilter>[] = [
  { label: '전체', value: 'ALL' },
  { label: '임원', value: 'ADMIN' },
  { label: '회원', value: 'MEMBER' },
  { label: '졸업생', value: 'GRADUATED' },
  { label: '수료생', value: 'COMPLETE' },
  { label: '휴학생', value: 'INACTIVE' },
];

const getRoleOptions = (roles?: MemberRolesResponse[]) => {
  if (!roles || roles.length === 0) {
    return FALLBACK_ROLE_OPTIONS;
  }

  const visibleRoles = roles
    .filter((role): role is Required<MemberRolesResponse> => Boolean(role.name))
    .filter((role) => !UNAUTHORIZED_MEMBER_ROLES.includes(role.name))
    .filter((role) => !ADMIN_MEMBER_ROLES.includes(role.name))
    .map((role) => ({
      label: role.description || ROLE_LABELS[role.name] || role.name,
      value: role.name,
    }));

  return [{ label: '전체', value: 'ALL' }, { label: '임원', value: 'ADMIN' }, ...visibleRoles];
};

export default function MemberListContent() {
  const [searchInfo, setSearchInfo] = useState<{ type: MemberSearchType; keyword: string }>({ type: 'ALL', keyword: '' });
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState<MemberFilter>('ALL');

  const {
    data: { data: _members },
  } = useAppSuspenseQuery({
    queryKey: queryKey.member.all,
    queryFn: MemberControllerService.getAllMembersUsingGet,
  });
  const memberRolesQuery = useAppQuery({
    queryKey: queryKey.member.roles,
    queryFn: MemberControllerService.getRolesUsingGet,
  });

  const members = _members as unknown as Required<MemberResponse>[];
  const roleOptions = useMemo(() => getRoleOptions((memberRolesQuery.data?.data ?? undefined) as MemberRolesResponse[] | undefined), [memberRolesQuery.data]);
  const roleTabItems = useMemo(() => roleOptions.map((role) => ({ key: role.value, label: role.label })), [roleOptions]);
  const visibleMembers = useMemo(() => members.filter((member) => !UNAUTHORIZED_MEMBER_ROLES.includes(member.role)), [members]);
  const filteredMembers = useMemo(() => {
    const normalizedSearchValue = searchInfo.keyword.trim().toLowerCase();

    return visibleMembers.filter((member) => {
      const matchesFilter = filter === 'ALL' || (filter === 'ADMIN' ? member.isAdmin || ADMIN_MEMBER_ROLES.includes(member.role) : member.role === filter);

      if (!matchesFilter) {
        return false;
      }

      if (normalizedSearchValue.length === 0) {
        return true;
      }

      const searchFields = {
        ALL: [member.name, member.loginID, member.department],
        NAME: [member.name],
        LOGIN_ID: [member.loginID],
        DEPARTMENT: [member.department],
      };

      return searchFields[searchInfo.type].filter(Boolean).some((value) => value.toLowerCase().includes(normalizedSearchValue));
    });
  }, [filter, searchInfo, visibleMembers]);

  const onSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchInfo({ type: 'ALL', keyword });
  };

  return (
    <MemberContent>
      <PageHeader
        title="회원 목록"
        actions={
          <MemberListToolbar>
            <MemberSearchForm onSubmit={onSearchSubmit}>
              <Input placeholder="이름, ID, 학과 검색" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
              <Button type="primary" htmlType="submit">
                검색
              </Button>
            </MemberSearchForm>
          </MemberListToolbar>
        }
      />
      <SectionTabs items={roleTabItems} activeKey={filter} onChange={(key) => setFilter(key)} />
      <MemberListBody>
        <MemberCardGrid>
          {filteredMembers.length === 0 ? (
            <EmptyState>조건에 맞는 회원이 없습니다.</EmptyState>
          ) : filteredMembers.map((member) => <MemberCard key={member.loginID} member={member} />)}
        </MemberCardGrid>
      </MemberListBody>
    </MemberContent>
  );
}
