import { trpc } from "@/utils/trpc";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import TaskDetailsModal from "@/components/Modals/TaskDetailsModal";
import UpdateTaskStatusButton from "../Buttons/UpdateTaskStatusButton";

export default function Task({ task }: { task: any }) {
  const [tooltip, setTooltip] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);


  useEffect(() => {
    let id: NodeJS.Timeout;
    if (tooltip) {
      id = setTimeout(() => setShowTooltip(true), 750)
    }
    return () => clearTimeout(id)
  }, [tooltip])

  const taskType = {
    Complete: {
      color: 'hover:text-yellow-600',
      icon: <MinusCircleIcon className="w-6 h-6 hover:text-yellow-400/80" />,
      tooltip: 'Mark as incomplete',
    },
    Incomplete: {
      color: 'hover:text-green-400/80',
      icon: <CheckCircleIcon className="w-6 h-6 hover:text-green-400/80" />,
      tooltip: 'Mark as complete'
    }
  }
  const taskStatus = taskType[task.status ?? 'Incomplete']

  return (
    <>
      <div className={`px-8 cursor-pointer hover:border-t hover:border-b border-gray-600/90 relative transition-colors duration-300`}>
        <div className={`bg-gradient-to-r from-green-500/80 to-cyan-500/80 absolute left-0 top-0 ${markingComplete ? 'w-full h-full' : 'w-0'}  transition-all duration-300`} />
        <div onClick={() => {
          setShowDetails(true)
        }} className="flex gap-4 items-center px-8 py-2  border-b border-gray-600/50 relative bg-transparent" key={task.id}>
          <UpdateTaskStatusButton
            className={`p-1 text-gray-500/50`}
            taskId={task.id}
            status={task.status}
            onClick={() => task.status !== 'Complete' && setMarkingComplete(true)}
            onMouseLeave={() => {
              setTooltip(false)
              setShowTooltip(false)
            }}
            onMouseEnter={() => {
              setTooltip(true);
            }} >
            {taskStatus.icon}
          </UpdateTaskStatusButton>

          {showTooltip &&
            <div className="absolute top-12 -left-2 rounded-lg p-2 text-white text-sm z-10 bg-gray-600" >{taskStatus.tooltip}</div>
          }
          <p className="text-gray-200">{task.title}</p>
        </div>
      </div>

      {showDetails && (
        <TaskDetailsModal isOpen={showDetails} close={() => setShowDetails(false)} taskId={task.id} />
      )}
    </>

  )
}
