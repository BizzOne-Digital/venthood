import { useEffect, useState } from 'react';
import api from '../services/api';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import Lightbox from '../components/Lightbox.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    api
      .get('/projects')
      .then((res) => setProjects(res.data.projects || []))
      .catch((err) => console.error('Failed to load projects:', err.message))
      .finally(() => setLoading(false));
  }, []);

  const images = projects.map((p) => p.featuredImage).filter(Boolean);

  return (
    <section className="py-20">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Work"
          title="Completed Projects"
          description="Browse recent range hood installations and ventilation projects across Calgary."
        />

        {loading ? (
          <LoadingSpinner />
        ) : projects.length === 0 ? (
          <p className="text-center text-text-gray">No projects to show yet. Please check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} onClick={() => setActiveIndex(i)} />
            ))}
          </div>
        )}
      </div>

      <Lightbox
        images={images}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
        onNext={() => setActiveIndex((i) => (i + 1) % images.length)}
      />
    </section>
  );
};

export default Projects;
