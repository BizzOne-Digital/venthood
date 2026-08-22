import { MapPin } from 'lucide-react';

// NOTE: featuredImage falls back to an Unsplash placeholder - replace with real client photos.
const PLACEHOLDER = 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80';

const ProjectCard = ({ project, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl border border-border-light bg-white text-left"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.featuredImage || PLACEHOLDER}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-heading text-base font-semibold text-text-dark">{project.title}</h3>
        {project.location && (
          <p className="mt-1 flex items-center gap-1 text-xs text-text-gray">
            <MapPin size={14} /> {project.location}
          </p>
        )}
      </div>
    </button>
  );
};

export default ProjectCard;
