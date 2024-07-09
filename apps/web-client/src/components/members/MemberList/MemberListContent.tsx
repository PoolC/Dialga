import { MemberControllerService, MemberResponse, queryKey, useAppSuspenseQuery } from '~/lib/api-v2';
import { StyledMemberList } from './MemberListContent.styles';
import { UNAUTHORIZED_MEMBER_ROLES } from '~/constants/memberRoles';
import MemberCard from '../MemberCard/MemberCard';

export default function MemberListContent() {
  const {
    data: { data: _members },
  } = useAppSuspenseQuery({
    queryKey: queryKey.member.all,
    queryFn: MemberControllerService.getAllMembersUsingGet,
  });

  const members = _members as unknown as Required<MemberResponse>[];

  return (
    <StyledMemberList>
      {members
        .filter((member) => !UNAUTHORIZED_MEMBER_ROLES.includes(member.role))
        .map((member) => (
          <MemberCard key={member.loginID} member={member} />
        ))}
    </StyledMemberList>
  );
}
