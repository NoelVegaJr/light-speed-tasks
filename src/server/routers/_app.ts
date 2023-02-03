import { z } from 'zod';
import { procedure, router } from '@/server/trpc';
import { projectsRouter } from '@/server/routers/projects';
import { userRouter } from './user';
import { taskRouter } from './task';

export const appRouter = router({
  projects: projectsRouter,
  user: userRouter,
  task: taskRouter
 });

// export type definition of API
export type AppRouter = typeof appRouter;
