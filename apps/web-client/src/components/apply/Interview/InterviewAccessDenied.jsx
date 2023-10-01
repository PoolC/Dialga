import { Block, WhiteBlock } from '../../../styles/common/Block.styles';
import { StyledIcon } from '../Apply';
import { Content } from '../Apply';
import Spinner from '../../common/Spinner/Spinner';

const InterviewAccessDenied = ({ loading }) => {
  return (
    <Block>
      <WhiteBlock>
        <h2 className="block_title">면접 시간 제출</h2>
        {loading && <Spinner />}
        {!loading && (
          <>
            <Content>
              <div>
                <StyledIcon className="fas fa-exclamation-circle"></StyledIcon>
              </div>
              <div>
                현재 가입 신청 가능 기간이 아닙니다.
                <br />
                자세한 사항은 동아리 회장에게 문의해주세요.
              </div>
            </Content>
          </>
        )}
      </WhiteBlock>
    </Block>
  );
};

export default InterviewAccessDenied;
