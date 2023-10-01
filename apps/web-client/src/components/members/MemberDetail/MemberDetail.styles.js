import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

export const ContentContainer = styled.div`
  width: 90%;
  display: flex;
  @media (max-width: 576px) {
    flex-direction: column;
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
`;

export const StyledImage = styled.img`
  width: 200px;
  height: 200px;
`;

export const TextContainer = styled.div`
  flex: 1;
  padding: 30px 30px;
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: flex-end;
  @media (max-width: 576px) {
    justify-content: center;
  }
`;

export const Name = styled.p`
  font-weight: 800;
  font-size: 2rem;
`;

export const Status = styled.span`
  font-weight: 300;
  margin-left: 5px;
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
  @media (max-width: 576px) {
    align-items: center;
    justify-content: center;
  }
`;

export const Department = styled.p``;

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
  @media (max-width: 576px) {
    align-items: center;
    justify-content: center;
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
`;

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  h2 {
    padding: 0px 20px;
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

export const Activities = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  scrollbar-color: none;
  margin: 0;
  padding: 0;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
