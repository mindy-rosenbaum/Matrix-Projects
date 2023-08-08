import projects from '../Data/Projects/projects.json';
import { Project } from '../Types/Project';
import { Status } from '../Types/enums';

//  parse projects JSON with string literals for status,Date and bool  props.
const getAllProjects = (): Project[] => {
  return projects.map((project: any) => {
    return new Project(project.id,
      project.name,
      project.customerCompany,
      project.date = new Date(project.date),
      project.description,
      project.teams,
      Status[project.status as keyof typeof Status],
      !!project.isStartUp,
      !!project.isEmbeeddedSW) as Project;
  });
};

export const ProjectsService = {
  getAllProjects
}
