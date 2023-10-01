import { useEffect, useState } from 'react';
import AdminInterviewTime from '../../../components/admin/AdminInterviewTime/AdminInterviewTime';
import { SUCCESS } from '../../../constants/statusCode';
import * as interviewAPI from '../../../lib/api/interview';

const AdminInterviewTimeContainer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    interviewAPI.getInterviews().then((res) => {
      if (res.status === SUCCESS.OK) {
        setData(res.data.data);
        setLoading(false);
      }
    });
  }, []);

  const handleCreateInterviewTime = ({
    date,
    startTime,
    endTime,
    capacity,
  }) => {
    setLoading(true);
    interviewAPI
      .createInterviewSlot({ date, startTime, endTime, capacity })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          setData(res.data.data);
          setLoading(false);
        }
      });
  };

  const handleDeleteInterviewTime = ({ slotId }) => {
    setLoading(true);
    interviewAPI.deleteInterviewSlot({ slotId }).then((res) => {
      if (res.status === SUCCESS.OK) {
        setData(res.data.data);
        setLoading(false);
      }
    });
  };

  const handleDeleteAllInterviewTimes = () => {
    setLoading(true);
    interviewAPI.deleteAllInterviewSlot().then((res) => {
      if (res.status === SUCCESS.OK) {
        setData(res.data.data);
        setLoading(false);
        alert('모든 면접 시간 슬롯이 삭제되었습니다.');
      }
    });
  };

  const handleUpdateInterviewTime = ({
    slotId,
    startTime,
    endTime,
    capacity,
  }) => {
    interviewAPI
      .updateInterviewSlot({ slotId, startTime, endTime, capacity })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          setData(res.data.data);
          alert('면접 시간 슬롯이 성공적으로 수정되었습니다.');
        }
      });
  };

  return (
    <AdminInterviewTime
      data={data}
      loading={loading}
      setData={setData}
      onCreateInterviewTime={handleCreateInterviewTime}
      onDeleteInterviewTime={handleDeleteInterviewTime}
      onDeleteAllInterviewTime={handleDeleteAllInterviewTimes}
      onUpdateInterviewTime={handleUpdateInterviewTime}
    />
  );
};

export default AdminInterviewTimeContainer;
