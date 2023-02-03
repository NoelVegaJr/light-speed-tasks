import { z } from "zod";
import { router, procedure } from "@/server/trpc";
import prisma from "@/utils/prismadb";

export const projectsRouter = router({
  listAllProjects: procedure.query(async () => {
    try {
      const projects = await prisma.project.findMany({
        include: {
          tasks: {
            select: {
              id: true,
              title: true,
              estimatedHours: true,
              assignedTo: true
            },  
          },
          
        }
      })
      return projects
    } catch(error) {
       console.log(error)
    }
  }),
  listAllProjectsBase: procedure.query(async () => {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true
      }
    })

    return projects
  }),
  getProject: procedure.input(z.object({id: z.string()})).query(async({input}) => {
    const {id} = input;

    try {
      const project = await prisma.project.findUnique({where: {id}, include: {tasks: {include: {assignedTo: true}}, members: {include: {profile: true}}}})
      return project
    } catch(error) {

    }
  })
});
