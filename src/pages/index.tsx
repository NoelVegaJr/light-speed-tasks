import {  ListBulletIcon  } from "@heroicons/react/24/solid"
import { trpc } from "@/utils/trpc";
import MyTasks from "@/components/MyTasks";
import Link from "next/link";
import colors from "@/utils/colors";

function ProjectListItem({ project }: { project: any }) {
  return (
    <Link href={`/project/${project.id}`} className="flex items-center gap-6 w-1/2 p-4 cursor-pointer hover:bg-gray-400/10 transition-colors duration-200 overflow-hidden rounded-lg">
      <div className={`p-2 rounded-lg  ${colors[project.color]} `}>
        <ListBulletIcon className="w-8 h-8" />
      </div>
      <p className="text-gray-100">{project.title}</p>
    </Link>
  )
}

function MyProjects() {
  const myProjectsQuery = trpc.user.projectMemberships.useQuery({ id: '1' });

  return (
    <div className="w-full h-full ">
      <p className="font-semibold text-gray-100 text-xl mb-2 border-b border-gray-600/50 p-6 pb-10">My Projects</p>
      <div className="flex flex-wrap p-6">
        {myProjectsQuery.data?.map(membership => {
          console.log(membership.project.color)
          return <ProjectListItem key={membership.project.id} project={membership.project} />
        })}
      </div>

    </div>
  )
}

function HomeTile({ children, className }: { children: JSX.Element, className?: string }) {
  return (

    <div className={`h-96 w-1/2 rounded-lg border border-gray-600/50 hover:border-gray-500 transition-all duration-200 shadow-xl ${className}`} style={{ backgroundColor: '#2a2b2d' }}>
      {children}
    </div>
  )
}

export default function HomePage() {

  return (
      <div className="h-full w-full p-6 flex flex-col">
        <p className="font-semibold text-xl text-white">Home</p>
        <div className="mb-10">
          <p className="text-gray-300 font-semibold text-center">{new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: '2-digit' })}</p>
          <p className="text-gray-300 font-semibold text-3xl text-center">Good morning, Stuart</p>
        </div>

        <div className="max-w-7xl w-full flex mx-auto gap-6">
          <HomeTile>
            <MyTasks />
          </HomeTile>
          <HomeTile>
            <MyProjects />
          </HomeTile>
        </div>
      </div>

  )
}
