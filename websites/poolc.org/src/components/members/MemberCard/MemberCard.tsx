import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';

import { MemberCardBlock, MemberCardMajor, MemberCardName, MemberCardNameRow, MemberCardStatus, MemberCardText, MemberCardThumbnail, MemberItem, StyledLink } from './MemberCard.styles';
import { MENU } from '~/constants/menus';
import { MEMBER_ROLE } from '~/constants/memberRoles';

const MemberCard = ({
  member: { loginID, name, department, isAdmin, profileImageURL, role },
}: {
  member: {
    loginID: string;
    name: string;
    department: string;
    isAdmin: boolean;
    profileImageURL: string;
    role: string;
  };
}) => {
  const memberStatus = isAdmin ? '임원진' : role === MEMBER_ROLE.TECHNICIAN ? '기여자' : null;

  return (
    <StyledLink to={`/${MENU.MEMBER}/${loginID}`}>
      <MemberCardBlock>
        <MemberItem data-admin={isAdmin}>
          <MemberCardThumbnail src={getProfileImageUrl(profileImageURL)} alt="member_thumbnail" />
          <MemberCardText>
            <MemberCardNameRow>
              <MemberCardName>{name}</MemberCardName>
              {memberStatus && <MemberCardStatus>{memberStatus}</MemberCardStatus>}
            </MemberCardNameRow>
            <MemberCardMajor>{department}</MemberCardMajor>
          </MemberCardText>
        </MemberItem>
      </MemberCardBlock>
    </StyledLink>
  );
};

export default MemberCard;
