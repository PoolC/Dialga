import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

// Member detail keeps a two-column activity grid until this narrower, component-specific threshold.
const memberDetailStack = '@media (max-width: 680px)';
const memberDetailTwoColumns = '@media (min-width: 681px) and (max-width: 899px)';
const memberDetailMobile = '@media (max-width: 680px)';

export const ContentContainer = styled.div`
  width: 90%;
  display: flex;

  ${memberDetailMobile} {
    display: grid;
    width: 100%;
    grid-template-columns: 88px minmax(0, 1fr);
    align-items: start;
    gap: 2px 12px;
  }

`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 20px;
  margin: auto;

  ${memberDetailMobile} {
    width: 88px;
    height: 88px;
    grid-column: 1;
    grid-row: 1 / span 2;
    margin: 0;
    border-radius: 14px;
  }
`;

export const StyledImage = styled.img`
  width: 200px;
  height: 200px;

  ${memberDetailMobile} {
    width: 88px;
    height: 88px;
  }
`;

export const TextContainer = styled.div`
  flex: 1;
  padding: 30px 30px;
  ${memberDetailMobile} {
    display: contents;
  }
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;

  ${memberDetailMobile} {
    grid-column: 2;
    grid-row: 1;
    justify-content: flex-start;
    gap: 6px;

    .ant-btn {
      min-width: 44px;
      min-height: 44px;
    }
  }
`;

export const Name = styled.p`
  margin: 0;
  font-weight: 800;
  font-size: 2rem;

  ${memberDetailMobile} {
    font-size: 1.55rem;
    line-height: 1.2;
  }
`;

export const Status = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 0 7px;
  border-radius: 999px;
  background: ${colors.mint[0]};
  color: ${colors.mint[3]};
  font-size: 0.75rem;
  font-weight: 700;
`;

export const DepartmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 20px 0;
  h2 {
    font-weight: 600;
    font-size: 1.5rem;
    margin: 10px 0;
  }
  ${memberDetailMobile} {
    width: 100%;
    grid-column: 2;
    grid-row: 2;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0;

    h2 {
      display: none;
    }

    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Department = styled.p`
  margin: 0;

  ${memberDetailMobile} {
    color: ${colors.brown[0]};
    font-size: 0.9rem;
  }
`;

export const IntroductionContainer = styled.div`
  display: flex;
  width: 90%;
  margin: 20px 0;
  font-size: 1rem;
  span {
    font-size: 0.8rem;
    color: ${colors.brown[0]};
    margin: 5px;
  }
  ${memberDetailMobile} {
    width: 100%;
    grid-column: 2;
    grid-row: 3;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 2px 0 0;

    .member-introduction-quote {
      display: none;
    }
  }
`;

export const Introduction = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  text-align: center;
  word-break: keep-all;
  line-height: 1.2rem;
  padding: 0 0.5rem;

  ${memberDetailMobile} {
    justify-content: flex-start;
    padding: 0;
    text-align: left;
  }
`;

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;

  ${memberDetailMobile} {
    width: 100%;
    margin-top: 20px;
    padding-top: 18px;
    border-top: 1px solid rgba(76, 55, 34, 0.1);
  }
`;

export const Activities = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(290px, 100%), 1fr));
  width: 100%;
  align-items: stretch;
  gap: 16px;
  overflow: visible;
  scrollbar-color: none;
  margin: 0;
  padding: 0;

  > a,
  > li {
    min-width: 0;
  }

  ${memberDetailTwoColumns} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${memberDetailStack} {
    grid-template-columns: minmax(0, 1fr);

    > a > li {
      aspect-ratio: auto;
    }

    > a > li > div {
      height: auto;
      min-height: 0;
    }
  }

  ${memberDetailMobile} {
    gap: 12px;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
