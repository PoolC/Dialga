import ProjectListContainer from '../../containers/project/ProjectListContainer/ProjectListContainer';

export function loader() {
  return json({});
}

export function ProjectListPage() {
  return <ProjectListContainer />;
}
