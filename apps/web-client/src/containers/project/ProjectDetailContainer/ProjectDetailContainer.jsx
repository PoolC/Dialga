import ProjectDetail from '../../../components/projects/ProjectDetail/ProjectDetail';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as projectAPI from '../../../lib/api/project';
import { withRouter } from 'react-router-dom';
import Spinner from '../../../components/common/Spinner/Spinner';
import { SUCCESS } from '../../../constants/statusCode';

const ProjectDetailContainer = ({ location }) => {
  const projectId = location.pathname.replace('/project/', '');
  const member = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);

  useEffect(() => {
    projectAPI
      .getProject(projectId)
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          setProject(res.data.data);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error(e.response);
      });
  }, [projectId]);

  if (project === undefined) {
    window.location.reload();
  }

  return (
    <>
      {loading && <Spinner />}
      {!loading && <ProjectDetail project={project} member={member} />}
    </>
  );
};

export default withRouter(ProjectDetailContainer);
