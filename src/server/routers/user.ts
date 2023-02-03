import { z } from "zod";
import { router, procedure } from "@/server/trpc";
import prisma from "@/utils/prismadb";

export const userRouter = router({
  tasks: procedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const { id } = input;
    try {
      const tasks = await prisma.task.findMany({
        where: {
          profileId: id
        }
      })
      return tasks;
    } catch (error) {
      console.log(error)
    }
  }),
  projectMemberships: procedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const { id } = input;

    try {
      const memberships = await prisma.projectMember.findMany({
        where: { profileId: id }, select: {
          project: true
        }
      })
      console.log('memberships: ', memberships[0].project)
      if (memberships) {

        return memberships
      }
    } catch (error) {
      console.log(error)
    }
  }),
  listAllUsers: procedure.query(async () => {

    try {
      return await prisma.profile.findMany();
    } catch (error) {
      console.log(error);
    }
  }),
  getProfile: procedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const { id } = input;

    try {
      return await prisma.profile.findUnique({
        where: { id },
        include: {
          tasks: true,
          projectMembersips: {
            select: {
              project: {
                include: {
                  members: { select: { profile: true } },
                  tasks: true
                }
              }
            }
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  })
});
