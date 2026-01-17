import { useState } from "react";
import { projectsData } from "../data/projectsData";
import ProjectCard from "../components/ProjectCard";
import PPTViewer from "../components/PPTViewer";
import "../styles/projects.css";

export default function Projects() {
    const [active, setActive] = useState(null);

    return (
        <section className="projects-section">
            <h2 className="projects-title">
                Featured <span>Projects</span>
            </h2>

            <div className="projects-grid">
                {projectsData.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onOpen={setActive}
                    />
                ))}
            </div>

            {active && (
                <PPTViewer
                    project={active}
                    onClose={() => setActive(null)}
                />
            )}
        </section>
    );
}
