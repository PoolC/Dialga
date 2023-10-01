import { useEffect, useState } from 'react';
import Apply from '../../components/apply/Apply';
import { SUCCESS } from '../../constants/statusCode';
import * as infoAPI from '../../lib/api/info';

const ApplyContainer = () => {
  const [isSubscriptionPeriod, setIsSubscriptionPeriod] = useState(null);
  const [applyUri, setApplyUri] = useState(null);

  useEffect(() => {
    infoAPI.getPoolCInfo().then((res) => {
      if (res.status === SUCCESS.OK) {
        setIsSubscriptionPeriod(res.data.isSubscriptionPeriod);
        setApplyUri(res.data.applyUri);
      }
    });
  });

  if (
    isSubscriptionPeriod == null ||
    (isSubscriptionPeriod === true && applyUri == null)
  )
    return null;

  return (
    <Apply isSubscriptionPeriod={isSubscriptionPeriod} applyUri={applyUri} />
  );
};

export default ApplyContainer;
