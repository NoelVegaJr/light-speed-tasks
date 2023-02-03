import { trpc } from '@/utils/trpc';
import { BriefcaseIcon, InboxIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Project } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';


function Banner() {
  return <div className="h-1/3 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200" />
}

interface IProjectsProps {
  projects: any;
}

function MemberProjectsTable({ projects }: IProjectsProps) {
  const transform = () => {
    const myProjects: {id: string, title: string, members: string[], totalHours: number}[] = [];

    projects.forEach(project => {
      const myProject = {
        id: project.project.id,
        title: project.project.title,
        members: project.project.members.map(m => m.profile).map(p => p.name),
        totalHours: project.project.tasks.reduce((hours, task) => hours += task.estimatedHours, 0),
      };
      myProjects.push(myProject);
    })
    return myProjects;
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="flex w-full text-left text-gray-200/90 border-y border-gray-200/30">
          <th className="flex-1  font-normal p-2 border-x border-gray-200/30">Title</th>
          <th className=" w-32 font-normal p-2 border-r border-gray-200/30">Members</th>
          <th className=" w-32 font-normal p-2 border-r border-gray-200/30">Est. hours</th>
        </tr>
      </thead>
      <tbody className="text-gray-200/50 text-sm">
        {transform().map(project => {
          return (
            <Link key={project.id} href={`/project/${project.id}`}>
              <tr className="flex w-full text-left border-b border-gray-200/30 hover:bg-gray-400/10">
                <td className="flex-1 flex items-center gap-2 pl-8 p-2 border-x border-gray-200/30 cursor-pointer">
                  {project.title}
                </td>
                <td className="w-32 p-2 border-r border-gray-200/30">{project.members.join(' , ')}</td>
                <td className="w-32 p-2 border-r border-gray-200/30 ">{project.totalHours}</td>
              </tr>
            </Link>
          )

        })}
      </tbody>
    </table>
  )
}

function MemberTasksTable({ projects }: IProjectsProps) {

  const transform = () => {
    const tasks = [];

    projects.forEach((project) => {
      project.project.tasks.forEach((task) => {
        tasks.push(
          {
            projectId: project.project.id,
            project: project.project.title,
            title: task.title,
            hours: task.estimatedHours,
            status: task.status
          }
        )
      })
    })
    return tasks
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="flex w-full text-left text-gray-200/90 border-y border-gray-200/30">
          <th className="flex-1  font-normal p-2 border-x border-gray-200/30">Project</th>
          <th className=" w-32 font-normal p-2 border-r border-gray-200/30">Task</th>
          <th className=" w-32 font-normal p-2 border-r border-gray-200/30">Est. hours</th>
          <th className=" w-32 font-normal p-2 border-r border-gray-200/30">Status</th>
        </tr>
      </thead>
      <tbody className="text-gray-200/50 text-sm">
        {transform().map(task => {
          return (
            <Link key={task.id} href={`/project/${task.projectId}`}>
              <tr className="flex w-full text-left border-b border-gray-200/30 hover:bg-gray-400/10">
                <td className="flex-1 flex items-center gap-2 pl-8 p-2 border-x border-gray-200/30 cursor-pointer">
                  {task.project}
                </td>
                <td className="w-32 p-2 border-r border-gray-200/30">{task.title}</td>
                <td className="w-32 p-2 border-r border-gray-200/30 ">{task.hours}</td>
                <td className="w-32 p-2 border-r border-gray-200/30 ">{task.status}</td>
              </tr>

            </Link>
          )

        })}
      </tbody>
    </table>
  )
}


export default function ProfilePage() {
  const router = useRouter();
  const profile = trpc.user.getProfile.useQuery({ id: router.query.id })
  return (
      <>
        {profile.data && (
          <div className="p-6 max-w-5xl flex flex-col gap-10 w-full mx-auto overflow-y-auto">
            <div className="relative bg-white  border rounded-lg h-96 overflow-hidden">
              <Banner />
              <div className="w-fit h-fit translate-x-1/4 top-1/3 -translate-y-1/2 absolute border-4 border-white rounded-full ">
                <div className="h-32 w-32  text-2xl bg-gray-200 rounded-full grid place-content-center">
                  {profile.data.name[0]}
                </div>
              </div>

              <div className="mt-20 px-12">
                <div className="">
                  <p className="text-2xl font-semibold mb-6">
                    {profile.data.name}
                  </p>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4">
                      <BriefcaseIcon className="h-5 w-5" />
                      <p>{profile.data.role}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <InboxIcon className="h-5 w-5" />
                      <p>{profile.data.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <PhoneIcon className="h-5 w-5" />
                      <p>{profile.data.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-600/50 hover:border-gray-500 transition-all duration-200 shadow-xl rounded-lg">
              <h2 className="text-gray-200/80 text-2xl p-6 pb-0">Projects</h2>
              <div className="p-6">
                <MemberProjectsTable projects={profile.data.projectMembersips.map(project => project)} />
              </div>
            </div>

            <div className="border border-gray-600/50 hover:border-gray-500 transition-all duration-200 shadow-xl rounded-lg">
              <h2 className="text-gray-200/80 text-2xl p-6 pb-0">Tasks</h2>
              <div className="p-6">
                <MemberTasksTable projects={profile.data.projectMembersips.map(project => project)} />
              </div>

            </div>
          </div>
        )}

      </>

  )
}
