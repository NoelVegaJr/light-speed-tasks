import { z } from "zod";
import { router, procedure } from "@/server/trpc";
import prisma from "@/utils/prismadb";

export const taskRouter = router({
  getTask: procedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const { id } = input;

    try {
      const task = await prisma.task.findUnique({ where: { id }, include: { project: true, assignedTo: true, comments: { include: { profile: true } } } })
      return task
    } catch (error) {
      console.log(error);
    }
  })
  ,
  updateStatus: procedure.input(z.object({ id: z.string(), status: z.string() })).mutation(async ({ input }) => {
    const { id, status } = input;
    try {
      const task = await prisma.task.update({ where: { id }, data: { status } })
      return task;
    } catch (error) {
      console.log(error)
    }
  }),
  updateDescription: procedure.input(z.object({ id: z.string(), description: z.string() })).mutation(async ({ input }) => {
    const { id, description } = input;

    try {
      await prisma.task.update({ where: { id }, data: { description } });
    } catch (error) {
      console.log(error);
    }
  }),
  newComment: procedure.input(z.object({ id: z.string(), profileId: z.string(), text: z.string() })).mutation(async ({ input }) => {
    const { id, profileId, text } = input;

    try {
      await prisma.taskComment.create({ data: { taskId: id, profileId, text } })
    } catch (error) {
      console.log(error);
    }
  })
});
