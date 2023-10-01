import { useEffect, useState } from 'react';
import AdminInterview from '../../../components/admin/AdminInterview/AdminInterview';
import { SUCCESS } from '../../../constants/statusCode';
import * as interviewAPI from '../../../lib/api/interview';

const AdminInterviewContainer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    interviewAPI.getInterviews().then((res) => {
      if (res.status === SUCCESS.OK) {
        setData(res.data);
        setLoading(false);
      }
    });
  }, []);

  const handleCancelInterview = ({ loginId }) => {
    interviewAPI.deleteInterviewApplication({ loginId }).then((res) => {
      if (res.status === SUCCESS.OK) {
        setData(res.data);
        alert('성공적으로 면접이 취소되었습니다.');
      } else {
        alert('면접 취소를 실패하였습니다.');
      }
    });
  };

  return (
    <AdminInterview
      data={data}
      loading={loading}
      handleCancelInterview={handleCancelInterview}
    />
  );
};

export default AdminInterviewContainer;
