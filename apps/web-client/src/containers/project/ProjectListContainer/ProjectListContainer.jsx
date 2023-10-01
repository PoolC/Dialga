import ProjectList from '../../../components/projects/ProjectList/ProjectList';
import { useEffect, useState } from 'react';
import * as projectAPI from '../../../lib/api/project';

const ProjectListContainer = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await projectAPI.getProjects();
      setProjects(response.data.data);
      setLoading(false);
    })();
  }, []);

  return <ProjectList projects={projects} loading={loading} />;
};

export default ProjectListContainer;
