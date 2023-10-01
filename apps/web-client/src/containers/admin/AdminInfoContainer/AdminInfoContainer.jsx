import AdminInfo from '../../../components/admin/AdminInfo/AdminInfo';
import { useEffect, useState } from 'react';
import * as infoAPI from '../../../lib/api/info';
import { withRouter } from 'react-router';
import ActionButton from '../../../components/common/Buttons/ActionButton';
import { MENU } from '../../../constants/menus';
import { SUCCESS } from '../../../constants/statusCode';

const AdminInfoContainer = ({ history }) => {
  const [info, setInfo] = useState(null);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    infoAPI.getPoolCInfo().then((res) => {
      if (res.status === SUCCESS.OK) {
        setInfo(res.data);
      }
    });
  }, []);

  if (info === null) return null;

  const onUpdateInfo = ({
    presidentName,
    phoneNumber,
    location,
    locationUrl,
    introduction,
    mainImageUrl,
    isSubscriptionPeriod,
    applyUri,
  }) => {
    if (
      !presidentName ||
      !phoneNumber ||
      !location ||
      !introduction
      //!mainImageUrl ||
    ) {
      setErrorMessage('모든 항목을 입력하세요');
      onShowErrorModal();
      return;
    }
    infoAPI
      .updatePoolCInfo({
        presidentName,
        phoneNumber,
        location,
        locationUrl,
        introduction,
        mainImageUrl,
        isSubscriptionPeriod,
        applyUri,
      })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          setErrorMessage('정보가 성공적으로 수정되었습니다.');
          onShowErrorModal();
        }
      })
      .catch((e) => {
        console.error(e.response.data);
        if (e.response.data.status === 403) {
          history.push(`/${MENU.FORBIDDEN}`);
        }
        setErrorMessage('오류가 발생했습니다');
        onShowErrorModal();
      });
  };

  const onShowErrorModal = () => {
    setErrorModalVisible(true);
  };

  const onCloseErrorModal = (e) => {
    e.preventDefault();
    setErrorModalVisible(false);
  };

  const buttons = <ActionButton onClick={onCloseErrorModal}>확인</ActionButton>;

  return (
    <AdminInfo
      info={info}
      onUpdate={onUpdateInfo}
      errorMessage={errorMessage}
      buttons={buttons}
      errorModalVisible={errorModalVisible}
      onCloseErrorModal={onCloseErrorModal}
    />
  );
};

export default withRouter(AdminInfoContainer);
