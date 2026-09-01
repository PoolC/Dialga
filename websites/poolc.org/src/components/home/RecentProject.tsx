import { useEffect, useRef, useState } from 'react';
import { LeftOutlined, PushpinTwoTone, RightOutlined } from '@ant-design/icons';
import ProjectCard from '../projects/ProjectCard/ProjectCard';
import { NextButton, PrevButton, RecentProjectBlock, RecentProjectList, StyledLink } from './RecentProject.styles';
import { ProjectResponse } from '~/lib/api-v2';

const RecentProject = ({ projects }: { projects: ProjectResponse[] }) => {
  const viewport = useRef<HTMLUListElement | null>(null);
  const targetRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const options = {
      root: viewport.current,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.boundingClientRect.x < 0) {
            setIndex(Number(entry.target.id.replace('recent-project-card', '')));
          }
        }
        if (!entry.isIntersecting) {
          if (entry.boundingClientRect.x < 0) {
            setIndex(Number(entry.target.id.replace('recent-project-card', '')) + 1);
          }
        }

      });
    };

    const io = new IntersectionObserver(handleIntersection, options);

    targetRefs.current.forEach((target) => target && io.observe(target));

    return () => io && io.disconnect();
  }, [projects.length]);

  const getStep = () => Math.max(1, Math.floor(viewport.current!.getBoundingClientRect().width / 270));
  const maxIndex = Math.max(0, projects.length - 1);

  const handleClickPrev = () => {
    const step = getStep();
    const newIndex = index - step < 0 ? 0 : index - step;
    setIndex(newIndex);
    const targetCard = document.querySelector(`#recent-project-card${newIndex}`);

    if (!targetCard) {
      return;
    }

    targetCard.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  const handleClickNext = () => {
    const step = getStep();
    const newIndex = Math.min(index + step, maxIndex);
    setIndex(newIndex);
    const targetCard = document.querySelector(`#recent-project-card${newIndex}`);

    if (!targetCard) {
      return;
    }

    targetCard.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  return (
    <RecentProjectBlock>
      <PrevButton onClick={handleClickPrev}>
        <LeftOutlined />
      </PrevButton>
      <h3 className="project_container_title">
        <StyledLink to="/projects">
          <PushpinTwoTone twoToneColor="#47be9b" />
          Recent Projects
        </StyledLink>
      </h3>
      <RecentProjectList className="project_card_container" ref={viewport}>
        {projects.map((project, idx) => (
          <div
            key={project.id}
            id={`recent-project-card${idx}`}
            ref={(element) => {
              targetRefs.current[idx] = element;
            }}
          >
            <ProjectCard project={project} variant="home" />
          </div>
        ))}
      </RecentProjectList>
      <NextButton onClick={handleClickNext}>
        <RightOutlined />
      </NextButton>
    </RecentProjectBlock>
  );
};

export default RecentProject;
