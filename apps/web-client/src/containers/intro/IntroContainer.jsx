import { useEffect, useState } from 'react';
import Intro from '../../components/intro/Intro';
import { SUCCESS } from '../../constants/statusCode';
import * as infoAPI from '../../lib/api/info';

const IntroContainer = () => {
  const [introduction, setIntroduction] = useState(null);
  const [locationUrl, setLocationUrl] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    infoAPI.getPoolCInfo().then((res) => {
      if (res.status === SUCCESS.OK) {
        setIntroduction(res.data.introduction);
        setLocationUrl(res.data.locationUrl);
        setLoading(false);
      }
    });
  }, [introduction]);

  return (
    <>
      <Intro
        loading={loading}
        introduction={introduction}
        locationUrl={locationUrl}
      />
    </>
  );
};

export default IntroContainer;
