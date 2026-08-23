import colors from '~/lib/styles/colors';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';

import { MemberCardBlock, MemberCardMajor, MemberCardName, MemberCardStatus, MemberCardText, MemberCardThumbnail, MemberItem, StyledLink } from './MemberCard.styles';
import { MENU } from '~/constants/menus';

const getStableCardColor = (loginID: string) => {
  const index = loginID.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.mint.length;
  return colors.mint[index];
};

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
      <MemberItem
        style={{
          background: getStableCardColor(loginID),
        }}
      >
        <MemberCardThumbnail src={getProfileImageUrl(profileImageURL)} alt="member_thumbnail" />
        <MemberCardText>
          <MemberCardName>
            {name}
            {isAdmin && <MemberCardStatus>PoolC 임원</MemberCardStatus>}
          </MemberCardName>
          <MemberCardMajor>{department}</MemberCardMajor>
        </MemberCardText>
      </MemberItem>
    </MemberCardBlock>
  </StyledLink>
);

export default MemberCard;
