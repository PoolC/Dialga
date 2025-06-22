import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

export const ImageContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  height: auto;
  max-height: 500px;
  overflow: hidden;
  border-radius: 20px;
  margin: 0px;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding: 50px 0px 30px 0px;
  max-width: 1200px;
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Name = styled.p`
  font-weight: 800;
  font-size: 2rem;
`;

export const GenreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 20px 0;
  font-weight: 300;
  h2 {
    font-weight: 600;
    font-size: 1.5rem;
    margin: 10px 0 30px 0;
  }
`;

export const Genre = styled.p``;

export const DurationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 0px 0;
  font-weight: 300;
`;

export const Duration = styled.p`
  color: ${colors.brown[0]};
`;

export const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 20px 0;
  span {
    font-size: 0.8rem;
    color: ${colors.brown[0]};
    margin: 5px;
  }
`;

export const Introduction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  text-align: center;
  word-break: keep-all;
  font-size: 1rem;
  line-height: 1.2rem;
`;

export const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  width: 90%;
  margin-top: 0px;
  max-width: 1200px;
  h2 {
    padding: 0px 20px;
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
`;

export const Members = styled.ul`
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow: scroll;
  scrollbar-color: none;
  margin: 0;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const BodyContainer = styled.div`
  width: 100%;
  padding: 20px 0 20px 0;
  color: ${colors.brown[1]};
  word-break: break-all;
  line-height: 1.5rem;
  max-width: 100%;
  overflow: auto;
  color: ${colors.brown[1]};
  p,
  ul,
  ol {
    font-weight: 300;
    font-size: 0.9rem;
    color: ${colors.brown[1]};
  }
  ul,
  ol {
    padding-left: 1.5rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1rem 0;
    line-height: 2.2rem;
    color: ${colors.brown[1]};
  }
  hr {
    margin: 1rem 0;
  }
  img {
    max-width: 90%;
    margin: 1rem 0;
  }
  p {
    margin: 0.5rem 0;
  }
  a {
    max-width: 100%;
    word-break: break-all;
  }
`;
