import { useEffect, useRef, useState } from 'react';
import { LeftOutlined, PushpinTwoTone, RightOutlined } from '@ant-design/icons';
import ProjectCard from '../projects/ProjectCard/ProjectCard';
import { NextButton, PrevButton, RecentProjectBlock, RecentProjectList, StyledLink } from './RecentProject.styles';
import { ProjectResponse } from '~/lib/api-v2';

const RecentProject = ({ projects }: { projects: ProjectResponse[] }) => {
  const viewport = useRef<HTMLUListElement | null>(null);
  const target0 = useRef<HTMLDivElement | null>(null);
  const target1 = useRef<HTMLDivElement | null>(null);
  const target2 = useRef<HTMLDivElement | null>(null);
  const target3 = useRef<HTMLDivElement | null>(null);
  const target4 = useRef<HTMLDivElement | null>(null);
  const target5 = useRef<HTMLDivElement | null>(null);
  const target6 = useRef<HTMLDivElement | null>(null);
  const targetRefs = [target0, target1, target2, target3, target4, target5, target6];

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

        targetRefs.forEach((t) => {
          if (t.current) {
            observer.observe(t.current);
          }
        });
      });
    };

    const io = new IntersectionObserver(handleIntersection, options);

    if (target0.current) {
      io.observe(target0.current);
    }

    return () => io && io.disconnect();
    // eslint-disable-next-line
  }, [viewport]);

  const handleClickPrev = () => {
    const step = Math.floor(viewport.current!.getBoundingClientRect().width / 270);
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
    const step = Math.floor(viewport.current!.getBoundingClientRect().width / 270);
    const newIndex = index + step > 6 ? 6 : index + step;
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
          <div key={project.id} id={`recent-project-card${idx}`} ref={targetRefs[idx]}>
            <ProjectCard project={project} />
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
