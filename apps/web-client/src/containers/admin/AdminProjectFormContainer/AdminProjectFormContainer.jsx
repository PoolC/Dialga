import { useEffect, useState } from 'react';
import AdminProjectForm from '../../../components/admin/AdminProjectForm/AdminProjectForm';
import * as projectAPI from '../../../lib/api/project';
import * as memberAPI from '../../../lib/api/member';
import { withRouter } from 'react-router-dom';
import { MENU } from '../../../constants/menus';
import ActionButton from '../../../components/common/Buttons/ActionButton';
import { SUCCESS } from '../../../constants/statusCode';

const AdminProjectFormContainer = ({ match, history }) => {
  const projectID = match.params.projectID;

  const [members, setMembers] = useState([]);
  const [searchMembers, setSearchMembers] = useState([]);
  const [project, setProject] = useState(null);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (projectID) {
      (async () => {
        const response = await projectAPI.getProject(projectID);
        setProject(response.data.data);
        setMembers(response.data.data.members);
      })();
    }
  }, [projectID]);

  if (projectID && project === null) {
    return null;
  }

  const onCreateProject = ({
    name,
    thumbnailURL,
    genre,
    duration,
    description,
    body,
  }) => {
    if (!name || !description || !duration || !thumbnailURL || !body) {
      setErrorMessage('모든 항목을 입력하세요');
      onShowErrorModal();
      return;
    }
    projectAPI
      .createProject({
        name,
        genre,
        duration,
        thumbnailURL,
        description,
        body,
        memberLoginIDs: members.map((member) => member.loginID),
      })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          history.push('/admin/projects');
        }
      })
      .catch((e) => {
        console.error(e.response.data);
        if (e.response.data.status === 403) {
          history.push(`/${MENU.FORBIDDEN}`);
        }
        setErrorMessage('오류가 발생했습니다');
        onShowErrorModal();
      });
  };

  const onUpdateProject = ({
    name,
    description,
    genre,
    duration,
    thumbnailURL,
    body,
  }) => {
    if (!name || !description || !duration || !thumbnailURL || !body) {
      setErrorMessage('모든 항목을 입력하세요');
      onShowErrorModal();
      return;
    }
    projectAPI
      .updateProject({
        projectID,
        name,
        description,
        genre,
        duration,
        thumbnailURL,
        body,
        memberLoginIDs: members.map((member) => member.loginID),
      })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          history.push('/admin/projects');
        }
      })
      .catch((e) => {
        console.error(e.response.data);
        if (e.response.data.status === 403) {
          history.push(`/${MENU.FORBIDDEN}`);
        }
        setErrorMessage('오류가 발생했습니다');
        onShowErrorModal();
      });
  };

  const onSearchMember = (name) => {
    const response = memberAPI.searchMember({ name });
    response.then((res) => {
      if (res.status === SUCCESS.OK) {
        setSearchMembers(res.data.data);
      }
    });
  };

  const onAddMember = (e, member) => {
    e.preventDefault();
    setMembers([...members, member]);
  };

  const onDeleteMember = (e, member) => {
    e.preventDefault();
    setMembers(members.filter((m) => m.loginID !== member.loginID));
  };

  const onShowErrorModal = () => {
    setErrorModalVisible(true);
  };

  const onCloseErrorModal = (e) => {
    e.preventDefault();
    setErrorModalVisible(false);
  };

  const buttons = <ActionButton onClick={onCloseErrorModal}>확인</ActionButton>;

  return (
    <AdminProjectForm
      onCreateProject={onCreateProject}
      onSearchMember={onSearchMember}
      onUpdateProject={onUpdateProject}
      members={members}
      searchMembers={searchMembers}
      onAddMember={onAddMember}
      onDeleteMember={onDeleteMember}
      project={project}
      errorMessage={errorMessage}
      buttons={buttons}
      errorModalVisible={errorModalVisible}
      onCloseErrorModal={onCloseErrorModal}
    />
  );
};

export default withRouter(AdminProjectFormContainer);
