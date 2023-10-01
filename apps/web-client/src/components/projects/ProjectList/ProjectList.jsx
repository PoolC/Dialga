import { Block, WhiteBlock } from '../../../styles/common/Block.styles';
import Spinner from '../../common/Spinner/Spinner';
import ProjectCard from '../ProjectCard/ProjectCard';
import { Project } from './ProjectList.styles';

const ProjectList = ({ projects, loading }) => {
  return (
    <Block>
      <WhiteBlock>
        <h2 className="block_title">프로젝트</h2>
        {loading && <Spinner />}
        {!loading && (
          <Project>
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Project>
        )}
      </WhiteBlock>
    </Block>
  );
};

export default ProjectList;
