import { useEffect, useState } from 'react';
import ProjectList from '../../../components/projects/ProjectList/ProjectList';
import * as projectAPI from '../../../lib/api/project';

const ProjectListContainer = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('ALL');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await projectAPI.getProjects(category === 'ALL' ? undefined : category);
      setProjects(response.data.data);
      setLoading(false);
    })();
  }, [category]);

  return <ProjectList projects={projects} loading={loading} category={category} onCategoryChange={setCategory} />;
};

export default ProjectListContainer;
