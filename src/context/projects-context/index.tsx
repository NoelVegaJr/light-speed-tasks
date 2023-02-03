import { ProjectsManager } from "@/classes/classes";
import { projects } from "@/pages/data";
import { createContext } from "react";
import { trpc } from '@/utils/trpc';


export const ProjectManagerContext = createContext<ProjectsManager>(new ProjectsManager())

interface IProjectsProviderProps {
  children: JSX.Element
}

export default function ProjectManagerProvider({children}: IProjectsProviderProps) {
  const manager = new ProjectsManager(projects);
  const managerQuery = trpc.projects.listAllProjects.useQuery(); 
  
  console.log(managerQuery.data)

  if(managerQuery.data){
    const tasks = [];
    managerQuery.data.forEach(project => {
      project.tasks.forEach(task => {
        tasks.push(task)
      })
    })
    console.log(tasks)
  }
  return (
    <ProjectManagerContext.Provider value={manager}>{children}</ProjectManagerContext.Provider>
  )
}
