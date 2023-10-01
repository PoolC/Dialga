import {
  FooterBlock,
  FooterContent,
  FooterContentText,
  FooterDivider,
  FooterIcon,
  FooterItem,
} from './Footer.styles';

const Footer = ({ presidentName, location, phoneNumber }) => {
  const date = new Date();
  const thisYear = date.getFullYear();
  return (
    <FooterBlock>
      <FooterItem>
        <h3 className="contact_title">Contact</h3>
        <br />
        <FooterContent>
          <FooterIcon className="fas fa-map-marker-alt footer_icon"></FooterIcon>
          <FooterContentText>{location}</FooterContentText>
        </FooterContent>
        <FooterContent>
          <FooterIcon className="fas fa-envelope footer_icon"></FooterIcon>
          <FooterContentText>poolc.official@gmail.com</FooterContentText>
        </FooterContent>
        <FooterContent>
          <FooterIcon className="fas fa-phone-alt footer_icon"></FooterIcon>
          <FooterContentText>
            회장 {presidentName} {phoneNumber}
          </FooterContentText>
        </FooterContent>
      </FooterItem>
      <FooterDivider className="divider" />
      <FooterItem>
        <FooterContent>
          <FooterContentText style={{ textAlign: 'center' }}>
            회원가입은 매 학기 초마다 지정된 시기에 받고 있습니다.
            <br />
            프로그래밍에 관심이 있는 모든 학우분들의 연락을 환영합니다.
          </FooterContentText>
        </FooterContent>
        <br />
        <FooterContent>
          <FooterContentText>
            구인/홍보 문의는 이메일로 연락주시기 바랍니다.
          </FooterContentText>
        </FooterContent>
      </FooterItem>
      <FooterDivider />
      <FooterItem>
        <div className="detail_content">
          <FooterContentText>
            <a href="http://poolc.github.io/Regulation/">동아리 회칙 </a>
            <span>&nbsp;|&nbsp;</span>
            <a href="https://github.com/PoolC"> GitHub</a>
          </FooterContentText>
        </div>
        <div className="footer_rights_content">
          <FooterContentText>
            ⓒ {thisYear} All Rights Reserved. PoolC
          </FooterContentText>
        </div>
      </FooterItem>
    </FooterBlock>
  );
};

export default Footer;
