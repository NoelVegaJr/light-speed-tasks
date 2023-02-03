import { trpc } from "@/utils/trpc";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { CheckIcon, PlusSmallIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import UpdateTaskStatusButton from "../Buttons/UpdateTaskStatusButton";
import TaskCommentInput from "../Inputs/TaskCommentInput";
import TaskDescriptionInput from "../Inputs/TaskDescriptionInput";
import TaskCommentSection from "../TaskCommentsSection";

interface ITaskDetails {
  close: () => void;
  taskId: string;
}



export default function TaskDetails({ close, taskId }: ITaskDetails) {
  const task = trpc.task.getTask.useQuery({ id: taskId });

  return (
    <div className="h-full flex flex-col ">
      {task.data && (
        <>
          <nav className="px-6 py-3 flex justify-between items-center border-b border-gray-200/20 ">
            <UpdateTaskStatusButton taskId={taskId} status={task.data.status}>
              <div className="flex relative items-center gap-2 w-full h-full group p-2 rounded-lg border border-gray-200/30">

              {task.data.status !== 'Complete' ? (
                <>
                  <CheckIcon className="h-4 w-4 text-gray-200/40" />
                  <p className="text-gray-100 text-xs">Mark complete</p>
                  <div className={`absolute h-full w-full group-hover:bg-green-600/20 top-0 left-0 transition-colors duration-200 z-50`} />
                </>
              ) : (
                <>
                  <MinusCircleIcon className="h-4 w-4 text-gray-200/40" />
                  <p className="text-gray-100 text-xs">Mark incomplete</p>
                  <div className={`absolute h-full w-full group-hover:bg-yellow-600/20 top-0 left-0 transition-colors duration-200 z-50`} />
                </>
              )}
              </div>
            </UpdateTaskStatusButton>
            <div>
              <button onClick={close} className="p-1 rounded-lg hover:bg-gray-200/10 transition-colors duration-200 group">
                <XMarkIcon className="h-5 w-5 text-gray-200/40 group-hover:text-gray-200 transition-colors duration-200" />
              </button>
            </div>
          </nav>

          <main className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="p-6">
                <p className="mb-8 text-gray-200/90 text-2xl font-bold ">{task.data.title}</p>
                <div className="text-gray-200/60 text-sm flex flex-col gap-4">
                  <div className="flex gap-20 ">
                    <p>Assignee</p>
                    <Link href={`/profile/${task.data.assignedTo.id}`} className="text-blue-400/80 hover:underline">
                      <p>{task.data.assignedTo.name}</p>
                    </Link>
                  </div>
                  <div className="flex gap-28 ">
                    <p>ETA</p>
                    <p>{task.data.estimatedHours}</p>
                  </div>
                  <div className="flex gap-24 ">
                    <p>Project</p>
                    <Link href={`/project/${task.data.projectId}`} className="text-blue-400/80 hover:underline">

                      <p>{task.data.project.title}</p>
                    </Link>
                  </div>
                </div>

              </div>
              <TaskDescriptionInput taskId={taskId} initialValue={task.data.description ?? ''} />
              <div className="pl-6 mb-6">
                <button className="relative p-1 pr-2 group flex items-center gap-2 border border-gray-200/30 rounded-md">
                  <PlusSmallIcon className="w-4 h-4 text-gray-200/80 group-hover:text-gray-50" />
                  <p className="text-gray-200/90 text-xs font-semibold">Add subtask</p>
                  <div className={`absolute h-full w-full group-hover:bg-gray-200/10 top-0 left-0 transition-colors duration-200`} />
                </button>
              </div>
            </div>
            <TaskCommentSection taskId={taskId} createdAt={task.data.createdAt} comments={task.data.comments} profile={task.data.project} />
          </main>

          <TaskCommentInput taskId={taskId} profileId={'1'} />
        </>

      )}
    </div>


  )
}
