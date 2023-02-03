import { useState } from "react";
import { HashtagIcon, ListBulletIcon, PlusIcon } from "@heroicons/react/24/solid"
import { HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { trpc } from "@/utils/trpc";
import Link from "next/link";

export default function SideNavbar({ isOpen }: { isOpen: boolean }) {
  const [showProjects, setShowProjects] = useState(false);
  const projects = trpc.projects.listAllProjectsBase.useQuery();

  return (

    <div className={` ${isOpen ? 'w-60' : 'w-0'} h-full overflow-hidden transition-all duration-300 border-r border-gray-200/10`} style={{ backgroundColor: "#2e2e30" }}>
      {isOpen && (
        <div className="flex flex-col py-4">
          <Link href={'/Home'} className="flex pl-8 gap-4 items-center py-2 hover:bg-gray-300/10 flex-nowrap">
            <HomeIcon className="w-6 h-6" style={{ color: "#a2a0a2" }} />
            <p className="text-gray-100">Home</p>
          </Link>

          <div>
            <button onClick={() => setShowProjects(!showProjects)} className="flex pl-8 gap-4 items-center py-2 hover:bg-gray-300/10 w-full">
              <ListBulletIcon className="w-6 h-6" style={{ color: "#a2a0a2" }} />
              <p className="text-gray-100">Projects</p>
            </button>
            <div style={{ backgroundColor: "#1e1f21" }} className={`${showProjects ? 'h-fit' : 'h-0'} overflow-hidden bg-`}>
              {projects.data?.map(project => (
                <Link key={project.id} href={`/project/${project.id}`} className="pl-10 flex items-center gap-4 text-gray-100 text-sm p-2 hover:bg-blue-500/30 w-full">
                  <HashtagIcon className="w-4 h-4" />
                  <p>{project.title}</p>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/Team" className="flex pl-8 gap-4 items-center py-2 hover:bg-gray-300/10">
            <UserGroupIcon className="w-6 h-6" style={{ color: "#a2a0a2" }} />
            <p className="text-gray-100">Team</p>
          </Link>
        </div>
      )}

    </div>
  )
}
