import { useMemo, useState } from 'react';
import { Empty } from 'antd';
import { MemberControllerService, MemberResponse, queryKey, useAppSuspenseQuery } from '~/lib/api-v2';
import { CardGrid } from '~/components/common/CardGrid/CardGrid';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import { SearchInput } from '~/components/common/SearchInput/SearchInput';
import { SegmentFilter } from '~/components/common/SegmentFilter/SegmentFilter';
import { MemberListCount, MemberListEmpty } from './MemberListContent.styles';
import { UNAUTHORIZED_MEMBER_ROLES } from '~/constants/memberRoles';
import MemberCard from '../MemberCard/MemberCard';

type MemberFilter = 'all' | 'admin';

export default function MemberListContent() {
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState<MemberFilter>('all');

  const {
    data: { data: _members },
  } = useAppSuspenseQuery({
    queryKey: queryKey.member.all,
    queryFn: MemberControllerService.getAllMembersUsingGet,
  });

  const members = _members as unknown as Required<MemberResponse>[];
  const visibleMembers = useMemo(() => members.filter((member) => !UNAUTHORIZED_MEMBER_ROLES.includes(member.role)), [members]);
  const filteredMembers = useMemo(() => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    return visibleMembers.filter((member) => {
      const matchesFilter = filter === 'all' || member.isAdmin;

      if (!matchesFilter) {
        return false;
      }

      if (normalizedSearchValue.length === 0) {
        return true;
      }

      return [member.name, member.loginID, member.department].filter(Boolean).some((value) => value.toLowerCase().includes(normalizedSearchValue));
    });
  }, [filter, searchValue, visibleMembers]);

  return (
    <>
      <PageHeader
        title="회원 목록"
        actions={
          <>
            <SearchInput ariaLabel="회원 검색" placeholder="이름, ID, 학과 검색" value={searchValue} onChange={setSearchValue} />
            <SegmentFilter
              value={filter}
              onChange={setFilter}
              options={[
                { label: '전체', value: 'all' },
                { label: '임원', value: 'admin' },
              ]}
            />
          </>
        }
      />
      <MemberListCount>
        {filteredMembers.length} / {visibleMembers.length}명
      </MemberListCount>
      {filteredMembers.length === 0 ? (
        <MemberListEmpty>
          <Empty description="조건에 맞는 회원이 없습니다." />
        </MemberListEmpty>
      ) : (
        <CardGrid>
          {filteredMembers.map((member) => (
            <MemberCard key={member.loginID} member={member} />
          ))}
        </CardGrid>
      )}
    </>
  );
}
