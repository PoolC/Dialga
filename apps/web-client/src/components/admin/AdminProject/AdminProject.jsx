import ActionButton from '../../common/Buttons/ActionButton';

import { MENU } from '../../../constants/menus';
import {
  ButtonContainer,
  ContentsContainer,
  ProjectListRow,
  Table,
  TableHead,
  TitleContainer,
} from './AdminProject.styles';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';

const AdminProject = ({ projects, onDeleteProject }) => {
  const handleDelete = (e, projectID) => {
    e.preventDefault();
    onDeleteProject(projectID);
  };
  return (
    <WhiteNarrowBlock>
      <TitleContainer>프로젝트 관리</TitleContainer>
      <ButtonContainer>
        <ActionButton to={`/${MENU.ADMIN}/projects/new`}>
          프로젝트 생성
        </ActionButton>
      </ButtonContainer>
      <ContentsContainer>
        <Table>
          <thead>
            <TableHead>
              <th className="project_list_head">이름</th>
              <th className="project_list_head">장르</th>
              <th className="project_list_head">동작</th>
            </TableHead>
          </thead>
          <tbody>
            {projects.map((project) => (
              <ProjectListRow key={project.id}>
                <td className="project-list-row">{project.name}</td>
                <td className="project-list-row">{project.genre}</td>
                <td className="project-list-row">
                  <ActionButton
                    to={`/${MENU.ADMIN}/projects/edit/${project.id}`}
                  >
                    편집
                  </ActionButton>
                  <ActionButton onClick={(e) => handleDelete(e, project.id)}>
                    삭제
                  </ActionButton>
                </td>
              </ProjectListRow>
            ))}
          </tbody>
        </Table>
      </ContentsContainer>
    </WhiteNarrowBlock>
  );
};

export default AdminProject;
