import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';

import { MemberCardBlock, MemberCardMajor, MemberCardName, MemberCardStatus, MemberCardText, MemberCardThumbnail, MemberItem, StyledLink } from './MemberCard.styles';
import { MENU } from '~/constants/menus';

const MemberCard = ({
  member: { loginID, name, department, isAdmin, profileImageURL },
}: {
  member: {
    loginID: string;
    name: string;
    department: string;
    isAdmin: boolean;
    profileImageURL: string;
  };
}) => (
  <StyledLink to={`/${MENU.MEMBER}/${loginID}`}>
    <MemberCardBlock>
      <MemberItem data-admin={isAdmin}>
        <MemberCardThumbnail src={getProfileImageUrl(profileImageURL)} alt="member_thumbnail" />
        <MemberCardText>
          <MemberCardName>{name}</MemberCardName>
          {isAdmin && <MemberCardStatus>PoolC 임원</MemberCardStatus>}
          <MemberCardMajor>{department}</MemberCardMajor>
        </MemberCardText>
      </MemberItem>
    </MemberCardBlock>
  </StyledLink>
);

export default MemberCard;
