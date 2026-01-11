import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { projectsData } from "../data/projectsData";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/modals/ProjectModal";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    // Grid animation removed to prevent conflict with ProjectCard's individual scroll triggers

    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-6xl font-bold mb-12 text-text-primary">
                    <span className="text-orange">Power</span> Projects
                </h2>

                <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projectsData.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </div>

            <ProjectModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                project={selectedProject}
            />
        </section>
    );
};

export default Projects;
