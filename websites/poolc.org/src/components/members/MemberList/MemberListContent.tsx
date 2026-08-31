import { useMemo, useState } from 'react';
import { Empty } from 'antd';
import { MemberControllerService, MemberResponse, MemberRolesResponse, queryKey, useAppQuery, useAppSuspenseQuery } from '~/lib/api-v2';
import { FilterSearchToolbarOption } from '~/components/common/FilterSearchToolbar/FilterSearchToolbar';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import { SectionTabs } from '~/components/common/SectionTabs/SectionTabs';
import { MobileSectionFilter } from '~/components/common/MobileSectionFilter/MobileSectionFilter';
import { ListSearchToolbar } from '~/components/common/ListSearchToolbar/ListSearchToolbar';
import { MemberCardGrid, MemberContent, MemberEmptyState, MemberListBody, MemberRoleTabs } from './MemberListContent.styles';
import { ADMIN_MEMBER_ROLES, UNAUTHORIZED_MEMBER_ROLES } from '~/constants/memberRoles';
import MemberCard from '../MemberCard/MemberCard';

type MemberFilter = 'ALL' | 'ADMIN' | string;
type MemberSearchType = 'ALL';

const ROLE_LABELS: Record<string, string> = {
  ALL: '전체',
  MEMBER: '일반회원',
  ADMIN: '임원진',
  TECHNICIAN: '기여자',
  SUPER_ADMIN: '최고 관리자',
  GRADUATED: '졸업회원',
  COMPLETE: '수료회원',
  INACTIVE: '비활동',
};

const FALLBACK_ROLE_OPTIONS: FilterSearchToolbarOption<MemberFilter>[] = [
  { label: '전체', value: 'ALL' },
  { label: '임원진', value: 'ADMIN' },
  { label: '기여자', value: 'TECHNICIAN' },
  { label: '일반회원', value: 'MEMBER' },
  { label: '수료회원', value: 'COMPLETE' },
  { label: '졸업회원', value: 'GRADUATED' },
  { label: '비활동', value: 'INACTIVE' },
];

const ROLE_ORDER: MemberFilter[] = ['ALL', 'ADMIN', 'TECHNICIAN', 'MEMBER', 'COMPLETE', 'GRADUATED', 'INACTIVE'];

const getRoleOptions = (roles?: MemberRolesResponse[]) => {
  if (!roles || roles.length === 0) {
    return FALLBACK_ROLE_OPTIONS;
  }

  const roleByName = roles
    .filter((role): role is Required<MemberRolesResponse> => Boolean(role.name))
    .filter((role) => !UNAUTHORIZED_MEMBER_ROLES.includes(role.name))
    .filter((role) => !ADMIN_MEMBER_ROLES.includes(role.name));

  return ROLE_ORDER.map((roleName) => {
    const role = roleByName.find((item) => item.name === roleName);

    return {
      label: ROLE_LABELS[roleName] || role?.description || roleName,
      value: roleName,
    };
  });
};

export default function MemberListContent() {
  const [searchInfo, setSearchInfo] = useState<{ type: MemberSearchType; keyword: string }>({ type: 'ALL', keyword: '' });
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
        ALL: [member.name, member.department],
      };

      return searchFields[searchInfo.type].filter(Boolean).some((value) => value.toLowerCase().includes(normalizedSearchValue));
    });
  }, [filter, searchInfo, visibleMembers]);

  return (
    <MemberContent>
      <PageHeader
        title="회원 목록"
        actions={
          <ListSearchToolbar placeholder="이름, 학과 검색" value={searchInfo.keyword} onChange={(keyword) => setSearchInfo({ type: 'ALL', keyword })}>
            <MobileSectionFilter items={roleTabItems} activeKey={filter} onChange={setFilter} title="회원 구분" allLabel="전체 회원" showDrawerHeader={false} />
          </ListSearchToolbar>
        }
      />
      <MemberRoleTabs>
        <SectionTabs items={roleTabItems} activeKey={filter} onChange={(key) => setFilter(key)} />
      </MemberRoleTabs>
      <MemberListBody>
        <MemberCardGrid>
          {filteredMembers.length === 0 ? (
            <MemberEmptyState>
              <Empty description="조건에 맞는 회원이 없습니다." />
            </MemberEmptyState>
          ) : filteredMembers.map((member) => <MemberCard key={member.loginID} member={member} />)}
        </MemberCardGrid>
      </MemberListBody>
    </MemberContent>
  );
}
