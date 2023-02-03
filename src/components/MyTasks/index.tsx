import { useState } from "react";
import {trpc} from '@/utils/trpc';
import Task from "../Task";

export default function MyTasks() {
  const [status, setStatus] = useState('Incomplete');
  const myTasksQuery = trpc.user.tasks.useQuery({ id: '1' });
  return (
    <div className="w-full h-full">
      <div className="border-b border-gray-600/50 p-6 pb-0 mb-6">
        <p className="font-semibold text-gray-100 text-xl mb-2">My Tasks</p>
        <div className="flex text-gray-100 gap-8">
          <button onClick={() => setStatus('Incomplete')}>
            <div className={`pb-3 ${status === 'Incomplete' ? 'text-white shadow-[0px_-2px_0px_0px_rgba(162,160,162,0.85)_inset]' : 'text-gray-400/80'} hover:text-white hover:shadow-[0px_-2px_0px_0px_rgba(162,160,162,0.85)_inset]`}>Incomplete</div>
          </button>
          <button onClick={() => setStatus('Complete')}>
            <div className={` pb-3 ${status === 'Complete' ? 'text-white shadow-[0px_-2px_0px_0px_rgba(162,160,162,0.85)_inset]' : 'text-gray-400/80'} hover:text-white hover:shadow-[0px_-2px_0px_0px_rgba(162,160,162,0.85)_inset]`}>Complete</div>
          </button>
        </div>
      </div>
      <div>
        {myTasksQuery.data?.filter(task => {
          if (status === 'Incomplete' && (!task.status || task.status === 'Incomplete')) {
            return task;
          }
          if (status === 'Complete' && task.status === 'Complete') {
            return task
          }
        }).map(task => {
          return <Task key={task.id} task={task} />
        })}
      </div>

    </div>

  )
}
