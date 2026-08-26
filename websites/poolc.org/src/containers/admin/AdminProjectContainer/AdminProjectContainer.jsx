import { useEffect, useState } from 'react';
import AdminProject from '../../../components/admin/AdminProject/AdminProject';
import { SUCCESS } from '../../../constants/statusCode';
import { useMessage } from '../../../hooks/useMessage';
import * as projectAPI from '../../../lib/api/project';

const AdminProjectContainer = () => {
  const message = useMessage();
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await projectAPI.getProjects();
      setProjects(response.data.data);
    })();
  }, []);

  if (projects === null) {
    return null;
  }

  const onDeleteProject = (projectID) => {
    projectAPI.deleteProject(projectID).then((res) => {
      if (res.status === SUCCESS.OK) {
        setProjects((currentProjects) => currentProjects.filter((project) => project.id !== projectID));
        message.success('프로젝트가 삭제되었습니다.');
      }
    });
  };

  return <AdminProject projects={projects} onDeleteProject={onDeleteProject} />;
};

export default AdminProjectContainer;
