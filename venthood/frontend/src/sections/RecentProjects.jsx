import { useState } from 'react';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import Lightbox from '../components/Lightbox.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Button from '../components/Button.jsx';

const RecentProjects = ({ projects, loading }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const images = projects.map((p) => p.featuredImage).filter(Boolean);

  if (!loading && projects.length === 0) return null;

  return (
    <section className="bg-cream py-20">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Work"
          title="Recent Projects"
          description="A look at some of the range hood and ventilation installations we've recently completed."
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.slice(0, 4).map((project, i) => (
              <ProjectCard key={project._id} project={project} onClick={() => setActiveIndex(i)} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Button to="/projects" variant="outline">
            View All Projects
          </Button>
        </div>
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

export default RecentProjects;
