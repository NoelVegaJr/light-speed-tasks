import { Project, ProjectsManager } from "@/classes/classes";


export interface IMember {
  id: string;
  name: string;
  projects: Project[];
}

export interface IProject {
  id: string;
  title: string;
  tasks: Omit<ITask, 'projectTitle'>[]
}

export interface ITask {
  id: string;
  title: string;
  assignedTo: string;
  estimatedHours: number;
  projectTitle: string;
}

export interface ISelectOption {
  label: string;
  id: string;
}

export interface ITableProps {
  filter: ISelectOption;
  onClick: () => void;
}
