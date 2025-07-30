import { useEffect, useState } from 'react';
import AdminProject from '../../../components/admin/AdminProject/AdminProject';
import { SUCCESS } from '../../../constants/statusCode';
import * as projectAPI from '../../../lib/api/project';

const AdminProjectContainer = () => {
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
        setProjects(projects.filter((project) => project.id !== projectID));
      }
    });
  };

  return <AdminProject projects={projects} onDeleteProject={onDeleteProject} />;
};

export default AdminProjectContainer;
