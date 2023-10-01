import { useEffect, useState } from 'react';
import RecentNotice from '../../../components/home/RecentNotice/RecentNotice';
import * as postAPI from '../../../lib/api/post';
import Spinner from '../../../components/common/Spinner/Spinner';
import { SUCCESS } from '../../../constants/statusCode';

const RecentNoticeContainer = () => {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    postAPI.getPosts({ urlPath: 'promotion', page: 1 }).then((res) => {
      if (res.status === SUCCESS.OK) {
        setNotices(res.data.data.slice(0, 5));
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && <RecentNotice notices={notices} />}
    </>
  );
};

export default RecentNoticeContainer;
