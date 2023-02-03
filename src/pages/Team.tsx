import { trpc } from "@/utils/trpc"
import Link from "next/link";



export default function TeamPage() {
  const team = trpc.user.listAllUsers.useQuery();

  return (
    <div className="h-full p-6">
      <div className="mb-4 text-2xl text-gray-200" >Team</div>
      <div className="">
        <table className="w-full">
          <thead>
            <tr className="flex w-full text-left text-sm text-gray-200/90 border-y border-gray-200/30">
              <th className="flex-1  font-normal p-2 border-r border-gray-200/30">Name</th>
              <th className=" w-72 font-normal p-2 border-r border-gray-200/30">Role</th>
              <th className=" w-72 font-normal p-2 border-r border-gray-200/30">Email</th>
              <th className=" w-72 font-normal p-2 ">Phone</th>
            </tr>
          </thead>
          <tbody className="text-gray-200/50 text-sm">

            {team.data?.map(profile => (

              <tr key={profile.id} className="flex w-full text-left border-b border-gray-200/30 hover:bg-gray-400/10 cursor-pointer">

                <td className="flex-1 border-r border-gray-200/30">
                  <Link href={`profile/${profile.id}`} className="w-full pl-6 py-2 flex items-center gap-4">
                    <div className="bg-yellow-200 text-gray-600 h-8 w-8 rounded-full grid place-content-center">
                      <p>
                        {profile.name[0]}
                      </p>
                      
                    </div>
                    {profile.name}
                  </Link>

                  </td>
                <td className="w-72 p-2 border-r border-gray-200/30">{profile.role}</td>
                <td className="w-72 p-2 border-r border-gray-200/30">{profile.email}</td>
                <td className="w-72 p-2">{profile.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}
