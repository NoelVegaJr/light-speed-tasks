import { Bars3Icon, CheckIcon, HashtagIcon, ListBulletIcon, PlusIcon, PlusSmallIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import TopNavbar from "@/components/Layout/TopNavbar";
import SideNavbar from "@/components/Layout/SideNavbar";
import MyTasks from "@/components/MyTasks";
import Link from "next/link";



function ProjectListItem({ project }: { project: any }) {
  const colors = {
    'bg-green-400': 'bg-green-400',
    'bg-orange-400': 'bg-orange-400',
    'bg-yellow-400': 'bg-yellow-400'
  }
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
        <div className="flex items-center gap-6 w-1/2 p-4 cursor-pointer group hover:bg-gray-400/10 rounded-lg transition-colors duration-200">
          <div className="border border-dashed border-gray-200/50 group-hover:border-gray-200 rounded-lg p-2 transition-colors duration-200">
            <PlusIcon className="w-8 h-8 text-gray-200/50 group-hover:text-gray-200 transition-colors duration-200" />
          </div>
          <p className="text-gray-100 group-hover:text-gray-50">Create Project</p>
        </div>
        {myProjectsQuery.data?.map(membership => {
          console.log(membership.project.color)
          return <ProjectListItem project={membership.project} />
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
