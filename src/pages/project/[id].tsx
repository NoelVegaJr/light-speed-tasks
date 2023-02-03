import Layout from '@/components/Layout';
import TaskDetails from '@/components/TaskDetails';
import { trpc } from '@/utils/trpc';
import { CheckIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/24/solid';
import { ListBulletIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';



interface ITasksViewProps {
  tasks: any;
}

function TasksView({ tasks }: ITasksViewProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedTask, setSelectedTask] = useState(tasks[0].id)

  const getTotalHours = () => {
    let totalHours = 0;

    tasks.forEach(task => {
      totalHours += task.estimatedHours;
    })

    return totalHours
  }

  return (
    <div className="flex h-full">
      <div className={`flex-1 p-6 h-full`}>
        <div className="flex items-center justify-between mb-4">
          <button className="flex gap-2 items-center border border-gray-200/30 p-1 px-2 rounded-md">
            <PlusIcon className="w-4 h-4 text-gray-100/90" />
            <p className="text-gray-100/80 text-xs">Add task</p>
          </button>
          <p className="text-xl text-gray-200">
            Total hours {getTotalHours()}
          </p>
        </div>

        <table className="w-full">
          <thead>
            <tr className="flex w-full text-left text-sm text-gray-200/90 border-y border-gray-200/30">
              <th className="flex-1  font-normal p-2 border-r border-gray-200/30">Title</th>
              <th className=" w-32 font-normal p-2 border-r border-gray-200/30">Assignee</th>
              <th className=" w-32 font-normal p-2 border-r border-gray-200/30">Est. Hours</th>
              <th className=" w-32 font-normal p-2 ">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-200/50 text-sm">
            {tasks.map(task => (
              <tr key={task.id} className="flex w-full text-left border-b border-gray-200/30 hover:bg-gray-400/10">
                <td onClick={() => {
                  setSelectedTask(task.id)
                  setOpenDrawer(true)
                }} className="flex-1 flex items-center gap-2 pl-8 p-2 border-r border-gray-200/30 cursor-pointer">
                  <button className={`w-5 h-5 p-1 rounded-full border border-gray-200/30 ${task.status === 'Complete' ? 'bg-green-400/80' : ''}`}>
                    <CheckIcon className="h-full w-full text-gray-200 " />
                  </button>
                  {task.title}</td>
                <Link href={`/profile/${task.assignedTo.id}`} className="hover:text-blue-400/80 hover:underline">

                  <td className="w-32 p-2 border-r border-gray-200/30">{task.assignedTo.name}</td>
                </Link>
                <td className="w-32 p-2 border-r border-gray-200/30">{task.estimatedHours}</td>
                <td className="w-32 p-2">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`${openDrawer ? 'w-1/3 border-l border-gray-200/20' : 'w-0'} transition-all h-full overflow-hidden  duration-300  `}>
        {openDrawer && (
          <TaskDetails taskId={selectedTask} close={() => setOpenDrawer(false)} />
        )}
      </div>
    </div>
  )
}

interface IMembersViewProps {
  members: any;
  tasks: any;
}

function MembersView({ members, tasks }: IMembersViewProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedTask, setSelectedTask] = useState(tasks[0].id)

  const transform = () => {
    const membersTasksMap = new Map();

    members.forEach((member) => {
      membersTasksMap.set(member.profileId, { totalHours: 0, tasks: [] })
    })

    tasks.forEach((task) => {
      const memberId = task.assignedTo.id;
      membersTasksMap.get(memberId).totalHours += task.estimatedHours;
      membersTasksMap.get(memberId).tasks.push(task)
    })

    return membersTasksMap;
  }
  const data = transform();
  return (
    <>
      <div className="h-full flex ">
        <div className="flex-1 flex flex-col gap-8 mt-6">

          {members.map(member => (
            <div key={member.id} className="px-6">
              <div className="flex items-center justify-between mb-4">
                <Link href={`/profile/${member.profile.id}`} className="text-gray-200 text-xl hover:text-blue-400/80 hover:underline">{member.profile.name}</Link>
                <p className="text-gray-200 text-xl">Total hours {data.get(member.profileId).totalHours}</p>
              </div>
              <div>
                <table className="w-full">
                  <thead>
                    <tr className="flex w-full text-left text-gray-200/90 border-y border-gray-200/30">
                      <th className="flex-1  font-normal p-2 border-r border-gray-200/30">Task</th>
                      <th className=" w-32 font-normal p-2 border-r border-gray-200/30">Est. Hours</th>
                      <th className=" w-32 font-normal p-2 ">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-200/50 text-sm">
                    {data.get(member.profileId).tasks.map(task => (
                      <tr key={task.id} className="flex w-full text-left border-b border-gray-200/30 hover:bg-gray-400/10">
                        <td onClick={() => {
                          setSelectedTask(task.id)
                          setOpenDrawer(true)
                        }} className="flex-1 flex items-center gap-2 pl-8 p-2 border-r border-gray-200/30 cursor-pointer">
                          <button className={`w-5 h-5 p-1 rounded-full border border-gray-200/30 ${task.status === 'Complete' ? 'bg-green-400/80' : ''}`}>
                            <CheckIcon className="h-full w-full text-gray-200 " />
                          </button>
                          {task.title}</td>
                        <td className="w-32 p-2 border-r border-gray-200/30">{task.estimatedHours}</td>
                        <td className="w-32 p-2">{task.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <div className={`${openDrawer ? 'w-1/3 border-l border-gray-200/20' : 'w-0'} transition-all h-full overflow-hidden  duration-300  `}>

          {openDrawer && (

            <TaskDetails taskId={selectedTask} close={() => setOpenDrawer(false)} />
          )}
        </div>
      </div>
    </>
  )
}


export default function ProjectPage() {
  const [activeTab, setActiveTab] = useState('Tasks');
  const router = useRouter();
  const project = trpc.projects.getProject.useQuery({ id: router.query.id });

  return (
      <div className="flex flex-1 flex-col h-full ">
        {project.data && (
          <>
            <div className="flex flex-col gap-4 pl-6 pt-3 border-b border-gray-100/20">
              <div className="flex items-center gap-4">
                <div className={`${project.data.color} w-fit rounded-lg p-1`}>
                  <ListBulletIcon className="w-10 h-10" />
                </div>
                <h1 className="text-2xl text-gray-100/90">{project.data.title}</h1>
              </div>

              <div className="flex gap-6">
                <button onClick={() => setActiveTab('Tasks')} className={` w-fit pb-3 ${activeTab === 'Tasks' ? 'shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.85)_inset] text-white' : 'text-gray-200/60'}`}>Tasks</button>
                <button onClick={() => setActiveTab('Members')} className={` w-fit pb-3 ${activeTab === 'Members' ? 'shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.85)_inset] text-white' : 'text-gray-200/60'}`}>Members</button>
              </div>
            </div>

            <div className="flex-1  overflow-hidden">
              {activeTab === 'Tasks' && <TasksView tasks={project.data.tasks} />}
              {activeTab === 'Members' && <MembersView tasks={project.data.tasks} members={project.data.members} />}
            </div>
          </>
        )}
      </div>

  )
}
