import ProjectDetailContainer from '../../containers/project/ProjectDetailContainer/ProjectDetailContainer';

export function loader() {
  return json({});
}

export function ProjectDetailPage() {
  return <ProjectDetailContainer />;
}
